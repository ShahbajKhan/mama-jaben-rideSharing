import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import firebase from "firebase/app";
import "firebase/auth";
import carLogo from '../../../images/654.jpg'
const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const verifyEmail = loggedInUser.email;
    useEffect(() => {
        fetch(`https://guarded-dawn-98055.herokuapp.com/adminCheck/${verifyEmail}`,{
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    setIsAdmin(true);
                }
                else {
                    setIsAdmin(false)
                }

            })
    }, [])
    // console.log(isAdmin);
    const signOut = () => {

        firebase.auth().signOut().then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                error: '',
                success: false
            }
            setLoggedInUser(signedOutUser);
            setIsAdmin(false);
            sessionStorage.setItem('token', '');
        }).catch(err => {
            console.log(err);
            console.log(err.message)
        })
    };

    const name = loggedInUser.displayName;
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="d-flex">
                        <img src={carLogo} style={{height:'50px', width:'100px'}} alt=""/>
                        <h1 className="navbar-brand">MAMA <br />JABEN?</h1>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto">

                            <Link to="/home" className="nav-link">Home</Link>
                            <Link to="/home" className="nav-link">About us</Link>
                            <Link to="/home" className="nav-link">Vehicles</Link>
                            {
                                !isAdmin && <Link to="/bookingsList" className="nav-link">User Dashboard</Link>
                            }
                            {
                                isAdmin && <Link to="/admin/orderList" className="nav-link">Admin</Link>
                            }
                            <Link to="/home" className="nav-link">Contact</Link>
                            {
                                loggedInUser.email ? <button className="btn btn-warning me-2" onClick={signOut}>Log Out</button> : <Link to="/login" className="btn btn-success">Login</Link>
                            }
                            {name && <button className="btn btn-success">{name}</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;