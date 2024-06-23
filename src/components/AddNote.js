import React, { useState, useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context; // Extracts addNote function which was created and exported from NoteState.js component via the NoteContext.Provider

  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // onchange le garda update vako value haru liyera esle note add garne function run garaucha
    setNote({ title: "", description: "", tag: "default" }); // Reset the form after adding a note
    props.showAlert("Added Successfully","Success ")

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // esle title ra description ko values fill gardinchha, lekhda lekhdai paralelly update vako huncha value
  }

  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
          </div>
          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
