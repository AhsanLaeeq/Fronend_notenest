import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  // Track and log the current location pathname
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          NoteNest
        </Link>

        {/* Navbar Toggler Button for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Authentication Buttons (Login, Signup, Logout) */}
        {!localStorage.getItem("token") ? (
          <div className="d-flex">
            <Link className="btn btn-outline-primary mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-success mx-1" to="/signup">
              Signup
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
