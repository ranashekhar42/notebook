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
      "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWZjZTMxMjc5YzI0ZDQ5NDgxNjU3In0sImlhdCI6MTY4Njg0OTQwNX0.OwHYnQWOtKea4HjK1pFJWBO8hrvHv-Cnb2qqUVvDMnc"
    },
    body: JSON.stringify({title,description,tag}),
  });
  
  console.log("adding note")
   const json= response.json();
  const note={
    "user": "648afce31279c24d49481657",
    "title":title,
    "description":description,
    "tag":tag,
    "_id": "64903e4dceb4c2e766238c9d",
    "date": "2023-06-19T06:22:03.576Z",
    "__v": 0
  }
setNotes(notes.concat(note));
}

//Fetch all notes
const getNotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWZjZTMxMjc5YzI0ZDQ5NDgxNjU3In0sImlhdCI6MTY4Njg0OTQwNX0.OwHYnQWOtKea4HjK1pFJWBO8hrvHv-Cnb2qqUVvDMnc"
    },
  
  });
  const json=await response.json();

setNotes(json)
}



//delete a note
const deleteNote=async (id)=>{
  const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWZjZTMxMjc5YzI0ZDQ5NDgxNjU3In0sImlhdCI6MTY4Njg0OTQwNX0.OwHYnQWOtKea4HjK1pFJWBO8hrvHv-Cnb2qqUVvDMnc"
    },
   
  });
  const json= response.json();


  console.log("deleting note");
const newNotes=notes.filter((note)=>{return note._id!==id})
setNotes(newNotes);

}

//edit a note
const editNote=async (id,title,description,tag)=>{

  const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "authToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YWZjZTMxMjc5YzI0ZDQ5NDgxNjU3In0sImlhdCI6MTY4Njg0OTQwNX0.OwHYnQWOtKea4HjK1pFJWBO8hrvHv-Cnb2qqUVvDMnc"
    },
    body: JSON.stringify({title,description,tag}), 
  });
  const json= response.json();

  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if (element._id===id) {
      element.title=title;
      element.description=description;
        element.tag=tag;
      
    }
  }
}
    return(

       <noteContext.Provider value={{notes,addNote,getNotes,deleteNote,editNote}}>
        {props.children}
       </noteContext.Provider>
    )

}

export default NoteState;
