import React, { useContext, useEffect ,useRef ,useState}  from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
    const context= useContext(noteContext);
    const{notes,getNotes,editNote }=context;
let navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem("token"))
      {
        getNotes()
        // eslint-disable-next-line
      }
      else{
        navigate("/login")
      }
    },[])

    const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  const  updateNote=(currentNote)=>{
    ref.current.click();
     setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleEdit=(e)=>{
      
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refClose.current.click();
      props.showAlert('Updated Successfully','success')

     }
     const onChange=(e)=>{
 setNote({...note,[e.target.name]:e.target.value})
     }
       
  return (
    <>
    <AddNote showAlert={props.showAlert}/>

  
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>


<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
<div className="mb-3">
  <label htmlFor="etitle" className="form-label">Title</label>
  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required/>
  
</div>
<div className="mb-3">
  <label htmlFor="edescription" className="form-label">Description</label>
  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
</div>
<div className="mb-3">
  <label htmlFor="etag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
</div>

</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleEdit} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
<div className="container">
    <div className="row my-3">
      <h2>Your notes</h2>
      <div className="row mx-1">
        {notes.length===0 && 'No Notes to display'}
      </div>
      {notes.map((note)=>{
        return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
      })}
      </div>
      </div>
      </>
  )
}

export default Notes
