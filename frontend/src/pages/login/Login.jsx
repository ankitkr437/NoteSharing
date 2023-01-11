import React, { useRef, useContext } from 'react'
import './Login.css';
import { Link } from "react-router-dom";
import { loginCall } from '../../apiCalls.js';
import { AuthContext } from '../../context/AuthContext';
import {
  CircularProgress, LocalDining
} from "@material-ui/icons";
 
const Login = () => {


  const audio= new Audio();
  audio.src = "/music/comment.wav";
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);


  const onsubmithandler = (e) => {
    
        audio.play();
  
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    
    if(error)
    {
      alert("please again login...");
    }
   
  }
  return (
    <div className='login-container'>
       <div className='logo-login'>
                <p className='logo-1-login'>
                    HandNotes
                </p>
                <p className='logo-3-login'>A website where you can upload and get notes</p>
            </div>
      <div className='login-form-container'>
        

          <p className='login'>Login</p>


          <form onSubmit={onsubmithandler} style={{ height: "20vh" }}
          className='login-form'
          >

            <input type="email" placeholder='Email' className='input-login' ref={email} required></input >

            <input type="password" placeholder='Password' className='input-login'  ref={password} required minLength="6"></input>

            <input type="submit" placeholder="login" id='login-submit' className='input-login' style={{ backgroundColor: "#1e9ec7" }} disabled={isFetching} ></input>

          </form>


          <div className='login-signup-query'>
            <p style={{ marginTop: "-1vh" }}>Have you sign-up?</p>
            <Link to="/register" style={{ textDecoration: "none", marginTop: "-1vh" }}>
              <p style={{ color: "darkblue", fontWeight: "700" }}>SignUp</p>
            </Link>
          </div>
        
      </div>
    </div>
  )
}

export default Login
