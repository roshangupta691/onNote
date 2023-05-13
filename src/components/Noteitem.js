import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
    const { deleteNote } = context;
  const { note,updateNote } = props;

  return (
    <div className="notecard my-3 mx-2 my-2 card" style={{ width: "18rem" }}>
      <div className="card-body">
        <div className="d-flex">
        <h5 className="card-title">{note.title}</h5>
        <i className="fa fa-regular fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
        <i className="fa fa-light fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>

        </div>
        <p className="card-text">{note.description}</p>
        
      </div>
    </div>
  );
};

export default Noteitem;
