import React , { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

function NoteItem(props) {
  const context= useContext(noteContext);
    const{deleteNote}=context;

  const { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card">
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-solid fa-pen-to-square mx-3"></i>
          </div>
          <p className="card-text">{note.description}</p>

        </div>
      </div>
    </div>
  );
}

export default NoteItem;
