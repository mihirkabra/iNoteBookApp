import React, { useContext, useState } from "react";
import NoteContext, { NoteType } from "./noteContext";
import AlertContext from "./alertContext";

type NoteStateProps = {
  children: React.ReactNode
}

const NoteState = (props: NoteStateProps) => {
  const context = useContext(AlertContext);
  const { alert, showAlert } = context;
  const host = "http://localhost:5001";
  const [notes, setNotes] = useState<NoteType[]>([]);

  const getNotes = async () => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set("auth-token", (localStorage.getItem('authToken')?.toString())!)
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: requestHeaders
    });
    const json = await response.json();
    setNotes(json);
  }

  const addNote = async (title: string, description: string, tag: string) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set("auth-token", (localStorage.getItem('authToken')?.toString())!)

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    console.log(note);
    showAlert("Note Added Successfully", "success");
  };

  const deleteNote = async (id: string) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set("auth-token", (localStorage.getItem('authToken')?.toString())!)

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: requestHeaders
    });
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    showAlert("Note Deleted Successfully", "success");
  };
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');
  requestHeaders.set("auth-token", (localStorage.getItem('authToken')?.toString())!)

  const updateNote = async (id: string, title: string, description: string, tag: string) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
    showAlert("Note Updated Successfully", "success");
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
