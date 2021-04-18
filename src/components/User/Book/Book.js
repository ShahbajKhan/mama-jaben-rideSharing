import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { UserContext } from '../../../App';
import UserSideBar from '../UserSideBar/UserSideBar'
const Book = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [paymentMethod, setPaymentMethod] = useState('credit card');
    const handleChange = e => {
        setPaymentMethod(e.target.value);

    }
    console.log(paymentMethod);
    const orderDetail =
        useEffect(() => {
            fetch(`https://guarded-dawn-98055.herokuapp.com/vehicles/${id}`)
                .then(res => res.json())
                .then(data => setVehicle(data))
        }, []);

    const handlePaymentProcess = paymentId => {
        const orderDetails = {
            ...loggedInUser,
            vehicleType: vehicle,
            paymentMethod,
            paymentId,
            status: 'Pending',
            orderTime: new Date().toDateString('dd/MM/yyyy')
        };
        console.log(orderDetails);
        fetch('https://guarded-dawn-98055.herokuapp.com/bookVehicle', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {

                    alert("Your order placed successfully")
                }
            })
    }

    return (
        <section>
            
            <div className="row w-100">
                <div className="col-md-3">
                    <UserSideBar></UserSideBar>
                </div>
                <div className="col-md-9 bg-light">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="loginForm"  >
                                <input className="userInput form-control" name="user" placeholder="" defaultValue={loggedInUser.displayName} disabled /> <br />
                                <input className="userInput form-control" name="email" defaultValue={loggedInUser.email} disabled /> <br />
                                <input className="userInput form-control" name="description" defaultValue={vehicle.name} disabled /> <br />
                                <input className="userInput form-control" name="description" defaultValue={vehicle.price} disabled /> <br />

                            </div>

                        </div>
                        <div className="col-md-6">
                            <p>Pay With </p>
                            <input className="form-check-input" type="radio" id="credit-card" name="payment" value="credit card" onChange={handleChange} defaultChecked={true} />
                            <label className="form-check-label" for="credit card">Credit Card</label><br />
                            <input className="form-check-input" type="radio" id="paypal card" name="payment" value="paypal" onChange={handleChange} />
                            <label for="paypal card">Paypal</label><br />
                            <br />

                            <ProcessPayment handlePayment={handlePaymentProcess}></ProcessPayment>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Book;