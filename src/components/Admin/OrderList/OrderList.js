import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../Sidebar/SideBar';
import OrderListView from '../OrderListView/OrderListView';

const OrderList = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // Retrieve bookings using mail address
    useEffect(() => {
        fetch('https://guarded-dawn-98055.herokuapp.com/allBookings', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))
    }, []);
    return (

        <section className="row w-100">
            <div className="col-md-3">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-8 mt-5 py-5">
                <table class="table table-striped table-hover table-responsive-sm">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Vehicle</th>
                            <th scope="col">Pay With</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    {
                        bookings.map(booking => <OrderListView booking={booking}></OrderListView>)
                    }
                </table>
            </div>
        </section>

    );
};

export default OrderList;