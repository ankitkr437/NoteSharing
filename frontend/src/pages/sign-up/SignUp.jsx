import React, { useContext, useRef } from 'react'
import './SignUp.css';
import { Link } from "react-router-dom";
 
import { RegisterCall } from '../../apiCalls.js';
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {


    const audio= new Audio();
    audio.src = "/music/comment.wav";
    

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmpassword = useRef();
    
    const {   isFetching, dispatch } = useContext(AuthContext);
    const submithandler = (e) => {
        
        alert("Sit back and relax");
        audio.play();
        e.preventDefault();
        password.current.value === confirmpassword.current.value ?
            RegisterCall({
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }, dispatch) : alert("password is not same")
           
             alert("successfully registered")
    }


    return (

        <div className='signup-logo'>
            <div className='logo-signup'>
                <p className='logo-1-signup'>
                    HandNotes
                </p>
                <p className='logo-3-signup'>A website where you can upload and get notes</p>
            </div>

            <div className='signup-container'>

                <p className='signup'>SignUp</p>

                <form onSubmit={submithandler} className='signup-container-form'>

                    <input type="text" placeholder='Username'  ref={username}
                    className="signup-input"
                        required></input>

                    <input type="email" placeholder='Email'  ref={email} 
                      className="signup-input"
                    required></input>

                   

                     

                    <input type="password" placeholder='Password'   className="signup-input"
                        ref={password} minLength="6" required>
                        </input>

                    <input type="password" placeholder='Confirm Password'   className="signup-input" ref={confirmpassword} required></input>
                    
                    <input type="submit" placeholder='Register'   
                    id="signup-submit" className="signup-input" style={{ backgroundColor: "#1e9ec7" }} disabled={isFetching}></input>
                </form>

                <div className='login-signup-query' >
                    <p>Have you sign-up?</p>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <p style={{ color: "darkblue", fontWeight: "700" }}>Login</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}
export default SignUp
