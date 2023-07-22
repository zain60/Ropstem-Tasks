import React, { useState } from "react";
import "../App.css"
import axios from "axios";
import { useNavigate } from "react-router";

import Web3 from "web3";




export default function  AUth (props) {
  let [authMode, setAuthMode] = useState("signin")
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
    let method = 1;
    axios.post('http://localhost:30000/api/user/login',{email,password,method})
    .then(response => {
      localStorage.setItem("accessToken",response.data.access_token);
      alert(response.data.msg)
      navigateHomepage()
    }).catch(error => {
      console.log("error",error.response.data.msg);
      alert(error.response.data.msg)
    });
  };

  const handleSignup = async (event,address) => {

    if(event === "signup"){
       let method = 2;
      axios.post('http://localhost:30000/api/user/signup',{address,method})
      .then(response => {
        console.log("responce",response.data);
        alert(response.data.msg)
        setAuthMode("signin")
      }).catch(error => {
        console.log(error.response.data)
        alert(error.response.data.msg)
      });
    }
    else{
    event.preventDefault()
    console.log(username,email)
    const method = 1
    axios.post('http://localhost:30000/api/user/signup',{username,email,method})
    .then(response => {
      console.log("responce",response.data);
      alert(response.data.msg)
      setAuthMode("signin")
    }).catch(error => {
      console.log(error.response.data)
      alert(error.response.data.msg)
    });
  }
  };

  const signInWithMetamask = async (address)=>{
    let method = 2;
    axios.post('http://localhost:30000/api/user/login',{address,method})
    .then(response => {
      localStorage.setItem("accessToken",response.data.access_token);
      alert(response.data.msg)
      navigateHomepage()
    }).catch(error => {
      console.log("error",error.response.data.msg);
      alert(error.response.data.msg)
    });
  }





const handleMetamaskAuth = async (method) => {
  if (window.ethereum) {
    console.log("Metamask is installed.");

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      const web3 = new Web3(window.ethereum);
      if(method === "signup"){
        await handleSignup(method,address)
      }
      else{
        await signInWithMetamask(address)
      }
 
      
      const balance = await web3.eth.getBalance(address);

      console.log('Successfully authenticated with Metamask.');
      console.log('Account Address:', address);
      console.log('Account Balance:', balance);
    } catch (err) {
      console.log('Error authenticating with Metamask:', err.message);
    }
  } else {
    console.log('Metamask not detected. Please install the Metamask extension.');
  }
};


  
  
  


  if (authMode === 'signin') {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{' '}
              <span className="link-primary" onClick={changeAuthMode}>
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
              <button onClick={(event) => handleSignin(event)} type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="form-group mt-3">
  <button
    onClick={()=>handleMetamaskAuth("signin")}
    type="button"
    className="btn btn-secondary"
    style={{ backgroundColor: "#36b9cc", borderColor: "#36b9cc" }}
  >
    Sign In with Metamask
  </button>
</div>

            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
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
          <div className="d-grid gap-2 mt-3">
            <button  onClick={(event)=>handleSignup(event)} className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
          <div className="form-group mt-3">
  <button
    onClick={()=>handleMetamaskAuth("signup")}
    type="button"
    className="btn btn-secondary"
    style={{ backgroundColor: "#36b9cc", borderColor: "#36b9cc" }}
  >
    Sign up with Metamask
  </button>
</div>
          </p>
        </div>
      </form>
    </div>
  )
}
