import React from 'react';

const OrderListView = (props) => {
    const { displayName, email, paymentMethod, _id, status } = props.booking;
    const { name } = props.booking.vehicleType;
    let value2 = '';
    let value3 = '';
    if(status === 'Pending'){
         value2 = 'On Going';
         value3 = 'Done'
    }
    else if(status === 'On Going'){
         value2 = 'Pending';
        value3 = 'Done'
    }
    else if(status === 'Done'){
        value2 = 'Pending';
        value3 = 'On Going'
    }
    const updateStatus = e =>{
        const statusData ={
            status: e.target.value
        }
        fetch(`https://guarded-dawn-98055.herokuapp.com/update/${_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(statusData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    
                    alert("Status Updated")
                }
            })
    }
    return (
        <tbody>
            <tr>
                <td >{displayName}</td>
                <td >{email}</td>
                <td>{name}</td>
                <td>{paymentMethod}</td>
                <td>
                    <select name="orderStatus" id="cars" onChange={updateStatus} defaultValue="Hello" >
                        <option value={status} >{status}</option>
                        <option value={value2}>{value2}</option>
                        <option value={value3} >{value3}</option>
                        
                    </select>
                </td>
            </tr>
        </tbody>
    );
};

export default OrderListView;