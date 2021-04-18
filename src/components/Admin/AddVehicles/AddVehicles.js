import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Sidebar from '../Sidebar/SideBar';
const AddVehicles = () => {

    const [imageURL, setIMageURL] = useState(null);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const vehicleData = {
            name: data.name,
            price: data.price,
            description: data.description,
            imageURL: imageURL
        };
        const url = `https://guarded-dawn-98055.herokuapp.com/addVehicle`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(vehicleData)
        })
            .then(res => console.log('server side response', res))
    };


    const handleImageUpload = (event) => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '7a75c14103455199f02e8a7a6aac2c7e');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className="row w-100">
            <div className="col-md-3">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-8">
                <div className="text-center formCard bg-light">
                    <h1>Add Vehicles</h1>

                    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>


                        <input className="userInput form-control" name="name" placeholder="Enter Name" ref={register({ required: true })} /> <br />
                        <textarea className="userInput form-control" name="description" placeholder="Enter description" ref={register({ required: true })} /> <br />
                        <input className="userInput form-control" name="price" placeholder="Enter price" ref={register({ required: true })} /> <br />
                        <input className="userInput form-control" name="image" type="file" placeholder="Upload photo" onChange={handleImageUpload} /> <br />


                        <input className="btn btn-dark text-warning" type="submit" />
                    </form>


                </div>
            </div>
        </div>

    );
};

export default AddVehicles;