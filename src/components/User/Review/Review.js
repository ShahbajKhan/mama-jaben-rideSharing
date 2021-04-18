import { useForm } from 'react-hook-form';
import UserSideBar from '../UserSideBar/UserSideBar'
const Review = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const reviewData = {
            name: data.name,
            designation: data.designation,
            description: data.description
        };
        const url = `https://guarded-dawn-98055.herokuapp.com/addReview`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => console.log('server side response', res))
    };


    return (
        <section className="row w-100">
            <div className="col-md-3">
                <UserSideBar></UserSideBar>
            </div>
            <div className="col-md-9">
                <div className="text-center formCard bg-light">
                    <h1>Add Review</h1>

                    <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                        <input className="userInput form-control" name="name" placeholder="Your Name" ref={register({ required: true })} /> <br />
                        <input className="userInput form-control" name="designation" placeholder="Your Designation, Company's Name" ref={register({ required: true })} /> <br />
                        <input className="userInput form-control" name="description" placeholder="Enter description" ref={register({ required: true })} /> <br />
                        <input className="btn btn-dark text-warning" type="submit" />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Review;