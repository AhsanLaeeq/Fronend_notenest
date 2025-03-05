import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  // Access note context
  const context = useContext(noteContext);
  const { addNote } = context;

  // State to manage note details
  const [note, setNote] = useState({ title: "", description: "", tag: "default" });

  // Handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" }); // Reset form after submission
    props.showAlert("Note Added Successfully", "success");
  };

  // Handle input field changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 d-flex flex-column align-items-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center text-primary mb-3">Add a New Note</h2>

        <form className="my-3">
          {/* Title Input */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              rows="3"
            ></textarea>
          </div>

          {/* Tag Input */}
          <div className="mb-3">
            <label htmlFor="tag" className="form-label fw-bold">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>

          {/* Submit Button (Disabled if title or description is less than 5 characters) */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleClick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
