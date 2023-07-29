import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext, { NoteType } from "../context/notes/noteContext";
import alertContext from "../context/notes/alertContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

type EditNoteType = {
  id: string
  edittitle: string
  editdescription: string
  edittag: string
}

const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, updateNote } = context;
  const alertCont = useContext(alertContext);
  //const { alert, showAlert } = alertCont;
  const [note, setNote] = useState<EditNoteType>({
    id: "",
    edittitle: "",
    editdescription: "",
    edittag: "default",
  });
  const ref = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateMyNote = (currentNote: NoteType) => {
    ref.current!.click();
    setNote({
      id: currentNote._id,
      edittitle: currentNote.title,
      editdescription: currentNote.description,
      edittag: currentNote.tag,
    });
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateNote(note.id, note.edittitle, note.editdescription, note.edittag);
    closeRef.current!.click();
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <div className="notes">
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-target="#exampleModal"
        data-bs-toggle="modal"
      >
        Open first modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edittitle" className="col-form-label">
                    Title
                  </label>
                  <input
                    minLength={5}
                    required
                    value={note.edittitle}
                    type="text"
                    className="form-control"
                    id="edittitle"
                    name="edittitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="col-form-label">
                    Description
                  </label>
                  <textarea
                    minLength={5}
                    required
                    value={note.editdescription}
                    onChange={onChange}
                    className="form-control"
                    id="editdescription"
                    name="editdescription"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="col-form-label">
                    Tag
                  </label>
                  <input
                    value={note.edittag}
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="edittag"
                    name="edittag"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={closeRef}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled={
                    note.edittitle.length < 5 || note.editdescription.length < 5
                  }
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card allnotes">
        <h3 className="pt-4" style={{ paddingLeft: 40 }}>
          YOUR NOTES
        </h3>
        <hr />
        <div className="card-body px-5 pb-5 row equal-cols">
          {notes.length === 0 && (
            <div className="container mx-1">{"No Notes to display!"}</div>
          )}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateMyNote} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
