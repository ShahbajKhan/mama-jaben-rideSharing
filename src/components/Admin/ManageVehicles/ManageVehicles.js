import React, { useEffect, useState } from 'react';
import ManageVehicleView from '../ManageVehicleVIew/ManageVehicleView';
import Sidebar from '../Sidebar/SideBar';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [spinner, setSpinner] = useState(true);
    // Loading vehicles from server making a get request
    useEffect(() => {
        fetch('https://guarded-dawn-98055.herokuapp.com/vehicles')
            .then(res => res.json())
            .then(data => {
                setVehicles(data);
                setSpinner(false);
            })
    }, [])

    return (
        <div className="row w-100">
            <div className="col-md-3">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                <div >
                    <h1 className="text-center">Manage Vehicles</h1>
                    {
                        spinner && <div class="text-center">
                            <div class="spinner-grow" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                    <table class="table table-striped table-hover table-responsive-sm">
                        <thead>
                            <tr>
                                <th scope="col">Vehicle</th>
                                <th scope="col">Price($)</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        {
                            vehicles.map(vehicle => <ManageVehicleView vehicle={vehicle}></ManageVehicleView>)
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageVehicles;