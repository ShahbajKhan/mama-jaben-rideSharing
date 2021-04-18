import './Login.css'
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../../App';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, handleFacebookSignIn, updateUsername, storeAuthToken } from './LoginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGoogle, faFacebook} from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        photo: ''
    });
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, errors } = useForm();
    // Initialize Firebase app
    initializeLoginFramework();

    // Handle Form validation
    const handleBlur = (e) => {
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);

    }
    // handle Response 
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        redirect && storeAuthToken();
        redirect && history.replace(from);
    }

    // React form hook handle submit
    const onSubmit = data => {
        if (newUser && user.email && user.password) {
            if (user.password === user.confirmPassword) {
                createUserWithEmailAndPassword(user.name, user.email, user.password)
                    .then(res => {
                        handleResponse(res, true);
                        updateUsername(user.name)
                    })
            }
            else {
                alert("password didn't match")
            }
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }

    }

    // Handle Google sign in
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    // Handle Facebook Sign in
    const facebookSignIn = () => {
        handleFacebookSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }
    
    return (
        <div className="container">
            
            <div className="text-center formCard">
                <h3>{newUser ? "Register For Signing In" : "Sign In"}</h3>
               
                <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    {newUser && <input type="text" className="userInput form-control" name="name" placeholder="Your Name" onBlur={handleBlur} id="inputName" ref={register({
                        required: true, pattern: {
                            value: /^[a-zA-Z\s\.]*$/,
                            message: "*Please Provide a valid name"
                        },
                    })} />}
                    {errors.name && <span className="error">{errors.name.message}</span>}

                    <input type="email" onBlur={handleBlur} name="email" placeholder="Your Email" id="inputEmail" className="userInput form-control"
                        ref={register({
                            required: "*Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "*Please Provide a valid Email"
                            },
                        })} />
                    {errors.email && <span className="error">{errors.email.message} </span>}

                    <input type="password" onBlur={handleBlur} name="password" placeholder="Password" id="inputPassword" className="form-control userInput"
                        ref={register({
                            required: "*password is required",
                            pattern: {
                                value: /\d{1}/,
                                message: "*password must contain one numeric digit and must contain 6 character"
                            },
                            minLength: {
                                value: 6,
                                message: "*Minimum password length is 6",
                            },
                        })} />
                    {errors.password && <span className="error">{errors.password.message}</span>}

                    {newUser && <input type="password" onBlur={handleBlur} name="confirmPassword" placeholder="Re-type Password" id="inputPassword" className="form-control userInput"
                        ref={register({
                            required: "*password is required",
                            pattern: {
                                value: /\d{1}/,
                                message: "*Confirm password must match previous password"
                            },
                        })} />}
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

                    <input type="submit" value={newUser ? "Sign Up" : "Sign In"} className="btn btn-dark text-warning" />
                </form >
                {loggedInUser.error && <p style={{ color: 'red' }}>{loggedInUser.error}</p>}
                {loggedInUser.success && !newUser && <p style={{ color: 'green' }}>User created successfully!</p>}
                
                {
                    newUser ? <small>Already have an account? <span className="formType" onClick={() => setNewUser(!newUser)}>Login</span></small> : <small>Don't have an account? <span className="formType" onClick={() => setNewUser(!newUser)}>Create an account</span></small>
                }
                
                <div className="d-flex justify-content-center ">
                    <hr className="w-25" style={{ height: '2px' }} /> <p className="mx-1"> OR </p><hr className="w-25" style={{ height: '2px' }} />
                </div>
                
                <div className="externalButtons">
                    <button className="btn btn-warning text-white" onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} />  Google Sign In</button>

                    <button className="btn btn-primary" onClick={facebookSignIn}><FontAwesomeIcon icon={faFacebook} style={{ color: 'white' }} />  Facebook Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;