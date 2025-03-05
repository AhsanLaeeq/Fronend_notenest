import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">
      <div className="card my-3 shadow-sm border-0">
        <div className="card-body">
          {/* Title and Icons */}
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              {/* Delete Note Icon */}
              <i
                className="fa-solid fa-trash text-danger mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Note Successfully Deleted", "success");
                }}
              ></i>

              {/* Edit Note Icon */}
              <i
                className="fa-solid fa-user-pen text-primary mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>

          {/* Note Description */}
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
