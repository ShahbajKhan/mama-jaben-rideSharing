import React, { useEffect, useState } from 'react';
import VehicleCard from '../VehicleCard/VehicleCard';


const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [spinner, setSpinner] = useState(true);

    // Loading Data from server using get request
    useEffect(() => {
        fetch('https://guarded-dawn-98055.herokuapp.com/vehicles')
            .then(res => res.json())
            .then(data => {
                setVehicles(data);
                setSpinner(false);
            })
    }, [])
    return (
        <section id="book-ride" className="mt-5 container">
            <p className="text-center fw-bolder">Vehicle Models</p>
            <h2 className="text-center fw-bolder">Our <span style={{ color: '#ff4d30' }}>Vehicles</span></h2>
            <p className="text-center">To contribute to positive change and achieve our <br/> sustainability goals with many extraordinary</p>
            {
                spinner && <div class="text-center my-5">
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            {/* render vehicles from server side */}
            <div className="row">
                {
                    vehicles.map(vehicle => <VehicleCard vehicle={vehicle}></VehicleCard>)
                }
            </div>
        </section>
    );
};

export default Vehicles;