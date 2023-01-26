
import React, { useState } from "react";
import "../App.css"
import axios from "axios";
import { useNavigate } from "react-router";



export default function (props) {
  let [authMode, setAuthMode] = useState("signup")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const navigateHomepage=()=>{
    navigate('/Home')
  }
 
  const handleSignin = async (event) => {
    event.preventDefault()
    console.log(email,password)
    axios.post('http://localhost:30000/api/user/login',{email,password})
    .then(response => {
      console.log("responce",alert(response.data));
      navigateHomepage()
    }).catch(error => {
      console.log("error",error.response.data.msg);
      alert(error.response.data.msg)
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault()
    console.log(username,email,password)
    axios.post('http://localhost:30000/api/user/signup',{username,email,password})
    .then(response => {
      console.log("responce",response.data);
      alert(response.data.msg)
      setAuthMode("signin")
    }).catch(error => {
      console.log(error.response.data)
      alert(error.response.data.msg)
    });
  };


  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode} >
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button  onClick={(event)=>handleSignin(event)} type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary"  onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-1"
                placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
             value={password}
             onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button  onClick={(event)=>handleSignup(event)} className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
