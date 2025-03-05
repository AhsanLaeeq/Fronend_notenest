// import React, { useState } from 'react'
// import {useNavigate } from 'react-router-dom'


// const Login=(props)=> {
   
//     const [credentials, setcredentials] = useState({email:"",password:""})
//     let navigate =useNavigate();
//     const handleSumbit= async (e)=>{
//         e.preventDefault();
//         const response = await fetch("http://localhost:5000/api/auth/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({email:credentials.email,password:credentials.password})
          
//           });
//           const json =await response.json()
//           console.log(json);
//           if (json.success)
//           {
//             //redirect
//             localStorage.setItem('token',json.authtoken);
//             props.showAlert("Login Successfully","success")
//             navigate("/")
          
//             }
//             else{
        
//                 props.showAlert("Invalid Credentials","danger")
            
//             }

//     }
  

//     const onChange =(e)=>{
//         setcredentials({...credentials,[e.target.name]:e.target.value})
//     }


//   return (
//     <div className='container my-3'>
//        <form onSubmit={handleSumbit}>
//   <div className="mb-3">
//     <h2 className='container my-3'>Login With Your Credential</h2>
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control" id="email" name ="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
//     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password"/>
//   </div>
//   <button type="submit" className="btn btn-primary" >Submit</button>
// </form>
//     </div>
//   )
// }

// export default Login



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // State to store user credentials (email & password)
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // Hook to navigate programmatically after login
  let navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call to authenticate user
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    // If login is successful, store token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Login Successfully", "success");
      navigate("/"); // Redirect to home page
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
        <h2 className="text-center text-primary mb-3">Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
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
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
