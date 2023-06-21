import React , { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

function NoteItem(props) {
  const context= useContext(noteContext);
    const{deleteNote}=context;

  const { note,updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
         {/* <div className=" align-items-center"> */}
            <h5 className="card-title">{note.title}</h5>
            
          {/* </div> */}
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);
           props.showAlert('Deleted Successful','success')}}></i>
            <i className="fa-solid fa-pen-to-square mx-3 float-end" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
