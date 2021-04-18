import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignOutAlt, faHome, faCartPlus, faThLarge, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';


const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4" style={{ height: "100vh" }}>
            <ul className="list-unstyled">
                <li>
                    <Link to="#" className="text-white">
                        <FontAwesomeIcon icon={faCartPlus} /> <span>Book</span>
                    </Link>
                </li>
                <li>
                    <Link to="/bookingsList" className="text-white">
                        <FontAwesomeIcon icon={faThLarge} /> <span>Booking List</span>
                    </Link>
                </li>
                <li>
                    <Link to="/addReview" className="text-white">
                        <FontAwesomeIcon icon={faCommentDots} /> <span>Review</span>
                    </Link>
                </li>
                
                <li>
                    <Link to="/" className="text-white">
                        <FontAwesomeIcon icon={faHome} /> <span>Home</span>
                    </Link>
                </li>
                
            </ul>
            <div>
                <Link to="/" className="text-white"><FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span></Link>
            </div>
        </div>
    );
};

export default Sidebar;