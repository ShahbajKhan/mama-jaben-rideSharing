import React from 'react';
import {  Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51IeDFXARrizIn8XxcUu1zHPfbZOtbEXSmqiWNcS41NSUKH5K288HnJkFdRm0aYdM33DWN3eyhyl4J5TDRlgzfzIR00CeZVKDfA');

const ProcessPayment = ({handlePayment}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <SplitForm handlePayment={handlePayment}></SplitForm>
            </Elements>
        </div>
    );
};
export default ProcessPayment;