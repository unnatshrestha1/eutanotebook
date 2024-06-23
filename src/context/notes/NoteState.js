import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async() => {  
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')},
    });
    
    const json= await response.json()
    setNotes(json)
  };

  //Add a note
  const addNote = async(title, description, tag) => {  
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')},
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = async (id) => {
     
          //API Call
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')},
          });
          const json = response.json();
          console.log(json)
          
    console.log("Deleting the note with id"+id);
    const newNotes = notes.filter((note)=>{ return note._id!==id})  //choose gareko note ko id sanga namilne id bhako notes haru matra baaki rahanchha
    setNotes( newNotes )
  }; 

  //Edit a note
  const editNote = async (id, title, description, tag) => {

    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')},
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    console.log(json)
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title; 
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

//boiler plate ho jaile lekhnu parne whenever using context api

// NoteState is the provider component that holds the state.
// NoteContext.Provider supplies the notes and setNotes values to its children.


//When the addNote function is called, it sends a POST request to the server. The data (title, description, tag) is included in the body of this request. Before sending, the data is converted from a JavaScript object to a JSON string using JSON.stringify. This ensures the data is in a format that the server can easily parse and understand.