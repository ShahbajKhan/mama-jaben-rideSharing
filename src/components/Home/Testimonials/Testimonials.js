import React, { useEffect, useState } from 'react';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [spinner, setSpinner] = useState(true);
    // Loading Data from server using get request
    useEffect(() => {
        fetch('https://guarded-dawn-98055.herokuapp.com/reviews')
            .then(res => res.json())
            .then(reviews => {
                setTestimonials(reviews);
                setSpinner(false);
            })
    }, [])

    return (
        <section className="my-5 bg-light">
            <div className="container">
                <p className="text-center fw-bolder">Reviewed by People</p>
                <h1 className="text-center">Clients'<span style={{ color: '#ff4d30' }}>Testimonials</span></h1>
                <p className="text-center text-success ">Certain but she but shyness why cottage. <br/> Guy the put instrument sir entreaties affronting. Pretended exquisite see cordially the you. <br/> Weeks quiet do vexed.</p>
                {
                    spinner && <div class="text-center my-5">
                        <div class="spinner-grow" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {/* render reviews from server side */}
                <div className="row">
                    {
                        testimonials.map(testimonial => <TestimonialCard testimonial={testimonial}></TestimonialCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Testimonials;