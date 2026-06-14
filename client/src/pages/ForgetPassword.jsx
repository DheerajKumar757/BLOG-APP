import React, { useRef } from 'react'
import AnimationWrapper from '../common/page-animation'
import InputComponent from '../components/InputComponent'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const ForgetPassword = () => {

    const verifyForm = useRef()
    const navigate = useNavigate();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email

    const handleSubmit = (e) => {

        e.preventDefault();

        // form data
        let form = new FormData(verifyForm.current);
        let formData = {};

        // key wil be the name of the input field and value will be the value entered by the user
        for(let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // destructuring form data
        let { email } = formData;

        if(!emailRegex.test(email)) {
            return toast.error("Email is invalid.");
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/forget-password/", formData)
        .then(({ data }) => {
            toast.success(data.message);
            setTimeout(() => {
                navigate("/reset-password/"+data.pass_reset_username+"/"+data.pass_reset_param)
            }, 1000)
        })
        .catch(({ response }) => {
            toast.error(response.data.error);
        });
    }
    
  return (
    <AnimationWrapper>
        <section className='h-cover flex items-center justify-center'>
            <form ref={verifyForm} autoComplete='off' className='w-[80%] max-w-[400px]'>

                <h1 className='text-4xl font-gelasio capitalize text-center mb-15'>
                    Forgot Password?
                </h1>
                <InputComponent
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    icon="fi-rr-envelope" 
                />

                <button
                    className="btn-dark center mt-14"
                    type="submit"
                    onClick = {handleSubmit}
                >
                    Submit
                </button>  

                <p className='mt-6 text-gray-600 text-xl text-center'>
                    Alreday a member ? <Link to="/signin" className='underline text-black text-xl ml-1'>Sign in here.</Link>
                </p>

                <p className='mt-6 text-gray-600 text-xl text-center'>
                    Don't have an account ? <Link to="/signup" className='underline text-black text-xl ml-1'>Join us today.</Link>
                </p>


            </form>
        </section>
    </AnimationWrapper>
  )
}

export default ForgetPassword