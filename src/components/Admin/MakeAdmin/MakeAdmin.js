import React from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../Sidebar/SideBar';
const MakeAdmin = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const adminData = {
            email: data.email,

        };
        const url = `https://guarded-dawn-98055.herokuapp.com/addAdmin`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminData)
        })
            .then(res => console.log('server side response', res))
    };

    return (
        <div className="row w-100">
            <div className="col-md-3">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-8">
                <div className="text-center formCard bg-light">
                    <h1>Add Admin</h1>
                    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                        <input className="userInput form-control" name="email" placeholder="Enter Email" ref={register({ required: true })} /> <br />
                        <input className="btn btn-dark text-warning" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;