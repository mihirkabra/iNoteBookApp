import React, { useContext } from "react";
import noteContext, { NoteContextType, NoteType } from "../context/notes/noteContext";

type NoteItemProps = {
  note: NoteType
  updateNote: (currentNote: NoteType) => void
}

const NoteItem = (props: NoteItemProps) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-6">
      <div className="card my-3" style={{ backgroundColor: `#0407${Math.floor(Math.random() * 10)}4`, color: "#ffffff" }}>
        <div className="card-body text-wrap">
          <div className="d-flex align-items-center">
            <h5 className="card-title mt-1">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <div
            className="badge text-bg-secondary"
            style={{ letterSpacing: 2, marginBottom: 5, padding: "0 30 30 10" }}
          >
            {note.tag}
          </div>

          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
