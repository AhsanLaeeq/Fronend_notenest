import React from "react";
import { FaUserPlus, FaStickyNote, FaEdit, FaTrash } from "react-icons/fa";

const About = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="fw-bold mb-4">About <span className="text-primary">NoteNest</span></h1>
      <p className="fs-5 text-muted">
        Welcome to <span className="fw-bold">NoteNest</span>, a simple and efficient note-taking application designed to help you stay organized.
      </p>

      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          <div className="list-group">
            <div className="list-group-item py-3">
              <FaUserPlus className="text-primary me-2" size={20} />
              <strong>Sign Up & Login –</strong> Create an account using your <strong>name, email, and password</strong>. Log in securely to access your notes anytime.
            </div>

            <div className="list-group-item py-3">
              <FaStickyNote className="text-success me-2" size={20} />
              <strong>Create Notes –</strong> Write down your <strong>thoughts, tasks, or important information</strong> with a title, description, and tags for easy organization.
            </div>

            <div className="list-group-item py-3">
              <FaEdit className="text-warning me-2" size={20} />
              <strong>Edit & Update –</strong> Modify your notes anytime to keep them up to date.
            </div>

            <div className="list-group-item py-3">
              <FaTrash className="text-danger me-2" size={20} />
              <strong>Delete Notes –</strong> Remove unnecessary notes with a single click.
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 fs-5">
        Stay productive and never lose track of your ideas with <span className="fw-bold text-primary">NoteNest</span>! 🚀
      </p>
    </div>
  );
};

export default About;
