// import NoteContext from "./noteContext";
// import { useState } from "react";

// const NoteState = (props) => {
//   const host = "https://backendnest-production-a25a.up.railway.app";
//   const [notes, setNotes] = useState([]);

//   // Fetch All Notes
//   const getNotes = async () => {
//     try {
//       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       });

//       const json = await response.json();
//       setNotes(json);
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Add a Note
//   const addNote = async (title, description, tag) => {
//     try {
//       const response = await fetch(`${host}/api/notes/addnote`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ title, description, tag }),
//       });

//       const note = await response.json();
//       setNotes([...notes, note]);
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };

//   // Delete a Note
//   const deleteNote = async (id) => {
//     try {
//       await fetch(`${host}/api/notes/deletenote/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//       });

//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (error) {
//       console.error("Error deleting note:", error);
//     }
//   };

//   // Edit a Note
//   const editNote = async (id, title, description, tag) => {
//     try {
//       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ title, description, tag }),
//       });

//       await response.json();

//       setNotes((prevNotes) =>
//         prevNotes.map((note) =>
//           note._id === id ? { ...note, title, description, tag } : note
//         )
//       );
//     } catch (error) {
//       console.error("Error updating note:", error);
//     }
//   };

//   return (
//     <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//       {props.children}
//     </NoteContext.Provider>
//   );
// };

// export default NoteState;



import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://backendnest-production-a25a.up.railway.app";
  const [notes, setNotes] = useState([]);

  // Get stored auth token
  const getAuthToken = () => localStorage.getItem("token");

  // Fetch All Notes
  const getNotes = async () => {
    const authToken = getAuthToken();
    if (!authToken) {
      console.error("Error: No auth token found");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch notes: ${response.status}`);

      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const authToken = getAuthToken();
    if (!authToken) {
      console.error("Error: No auth token found");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) throw new Error(`Failed to add note: ${response.status}`);

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const authToken = getAuthToken();
    if (!authToken) {
      console.error("Error: No auth token found");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) throw new Error(`Failed to delete note: ${response.status}`);

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const authToken = getAuthToken();
    if (!authToken) {
      console.error("Error: No auth token found");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) throw new Error(`Failed to update note: ${response.status}`);

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
