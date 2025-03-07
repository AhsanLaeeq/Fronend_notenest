import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://backendnest-production-bb92.up.railway.app";
  const [notes, setNotes] = useState([]);

  // Fetch All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  // const addNote = async (title, description, tag) => {
  //   try {
      
  //     const response = await fetch(`${host}/api/notes/addnote`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify({ title, description, tag }),
  //     });

  //     const note = await response.json();
  //     setNotes([...notes, note]);
  //   } catch (error) {
  //     console.error("Error adding note:", error);
  //   }
  // };
  const addNote = async (title, description, tag) => {
    try {
      console.log("Auth Token before request:", localStorage.getItem("token"));
      console.log("Sending request to:", `${host}/api/notes/addnote`);
  
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),  // Check if this is null
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      const note = await response.json();
      console.log("Response received:", note);  // Log response
  
      setNotes([...notes, note]);  // Update state with new note
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      await response.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
