import React, { useState } from 'react'
import noteContext from './NoteContext'

const NoteState=(props)=>{
  const host="http://localhost:5000";
 const notesInitial=[];

const [notes,setNotes]=useState(notesInitial);

//Add a note
const addNote= async (title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/addNote`,{
    method: "POST", 
    headers: {
      
      'Content-Type': 'application/json',
      "authToken":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}),
  });
  
  console.log("adding note")
   const note= await response.json();
setNotes(notes.concat(note));
}

//Fetch all notes
const getNotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem("token")
    },
  
  });
  const json=await response.json();

setNotes(json);
}



//delete a note
const deleteNote=async (id)=>{
  const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem("token")
    },
   
  });
  const json= await response.json();


  console.log("deleting note");
  console.log(json)
const newNotes=notes.filter((note)=>{return note._id!==id})
setNotes(newNotes);

}

//edit a note
const editNote=async (id,title,description,tag)=>{

  const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag}), 
  });
  const json= await response.json();
  console.log(json)

let newNotes=JSON.parse(JSON.stringify(notes))

  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id===id) {
      element.title=title;
      element.description=description;
        element.tag=tag;
      break;
    }
  }
  setNotes(newNotes)
}
    return(

       <noteContext.Provider value={{notes,addNote,getNotes,deleteNote,editNote}}>
        {props.children}
       </noteContext.Provider>
    )

}

export default NoteState;
