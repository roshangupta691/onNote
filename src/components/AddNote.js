import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = () => {
    addNote(note.title,note.description,note.tag);
    setNote({ title: "", description: "", tag: "" });

  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
      <div className="container my-3">
        <h1>Welcome to iNoteBook</h1>
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <h5 className="card-title">Add Title</h5>
              <input
                type="text"
                className="form-control"
                value={note.title}
                id="title"
                name="title"
                aria-describedby="title"
                onChange={onchange}
              />
            </div>
            <h5 className="card-title">Description</h5>
            <div className="form-group">
              <textarea
                className="form-control"
                value={note.description}
                placeholder="Write your note here..."
                id="description"
                name="description"
                rows="3"
                onChange={onchange}
              ></textarea>
              <br />
            </div>
            <div className="mb-3">
              <h5 className="card-title">Tag</h5>
              <input
                type="text"
                className="form-control"
                value={note.tag}
                id="tag"
                name="tag"
                aria-describedby="tag"
                onChange={onchange}
              />
            </div>
            <button
            disabled={note.title.length<5 || note.description.length<5}
              className="btn btn-primary"
              id="addbtn"
              onClick={handleClick}
            >
              Add Note
            </button>
          </div>
        </div>
      </div>

  );
};

export default AddNote;
