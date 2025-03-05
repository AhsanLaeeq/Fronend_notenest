import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  // State to store user credentials (name, email, password)
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  // Hook to navigate programmatically after signup
  let navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    // API call to create a new user
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    console.log(json);

    // If signup is successful, store token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/"); // Redirect to home page
      props.showAlert("Account Created Successfully", "success");
    } else {
      // Show alert for invalid credentials
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  // Handle input field changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 d-flex flex-column align-items-center">
      <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-primary mb-3">Create an Account</h2>
        <p className="text-center text-muted">Secure your notes with your personal account.</p>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <div className="form-text text-muted">We'll never share your email with anyone else.</div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
