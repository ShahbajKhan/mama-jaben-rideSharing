import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ManageVehicleView = (props) => {
    const { name, price, description,_id } = props.vehicle;
    console.log(props.vehicle);
    const deleteProduct = (id) => {
        fetch(`https://guarded-dawn-98055.herokuapp.com/deleteVehicle/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => console.log('server side response', result))
    }
    return (

        <tbody>
            <tr>
                <td >{name}</td>
                <td>{price}</td>
                <td>{description}</td>
                <td><button className="btn btn-success" onClick={() => deleteProduct(_id)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button></td>
            </tr>
        </tbody>
    );
};

export default ManageVehicleView;