import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
// import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(NoteContext);
  // let history= useHistory();
  const { notes, getNotes, editNote } = context; // Extracts notes (the current state of the notes) and setNotes (the function to update the state) from the context object.

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    // else{
    //   // history.push("/login")
    // }
  }, []);  // ensures that getNotes is called once when the component mounts, fetching the list of notes.

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click(); // Trigger modal open
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    // modal khulaucha and modal form fill garcha current note ko details le
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); // Close modal
    props.showAlert("Updated Successfully","Success ")
    // modal form close garcha
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />; // Notes Mapping: It iterates over an array of notes using the map function. Apparently the notes is noteInitial
        })}
      </div>
    </>
  );
};

export default Notes;



  //esma bhako notes chai uta NoteState ma vako initial state ho
  //for unique key error key={note._id}

  //In the code note={note}, the word "note" appears twice, but each one means something different:
  // Left note: This is the name of the prop that you are passing to the NoteItem component. Think of it as a label or a tag.
  // Right note: This is the actual note data from your list of notes. It's the value you're assigning to the prop.
