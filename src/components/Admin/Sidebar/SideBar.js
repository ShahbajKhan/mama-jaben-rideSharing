import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignOutAlt, faHome, faGripHorizontal, faUserPlus, faPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';


const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 col-sm-12 py-5 px-4" style={{ height: "100vh" }}>
            <ul className="list-unstyled">
                <li>
                    <Link to="/admin/orderList" className="text-white">
                        <FontAwesomeIcon icon={faGripHorizontal} /> <span>Order List</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/addVehicle" className="text-white">
                        <FontAwesomeIcon icon={faPlus} /> <span>Add Vehicle</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/addAdmin" className="text-white">
                        <FontAwesomeIcon icon={faUserPlus} /> <span>Make Admin</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/manageVehicles" className="text-white">
                        <FontAwesomeIcon icon={faTools} /> <span>Manage Services</span>
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