import React, { useRef } from 'react'
import AnimationWrapper from '../common/page-animation'
import InputComponent from '../components/InputComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const VerifyEmail = () => {

    const verifyForm = useRef()
    const { token } = useParams();
    const navigate = useNavigate();

    let digitsRegex = /^\d+$/;

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
        let { token_verify } = formData;
        console.log(token_verify)

        if(!digitsRegex.test(token_verify)) {
            return toast.error("Only digits are allowed.");
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/verify-email/" + token, formData)
        .then(({ data }) => {
            toast.success("Email verified. Redirecting ...");
            setTimeout(() => {
                navigate("/signin")
            }, 3000)
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
                    Verify your Mail
                </h1>
                <InputComponent
                    name="token_verify"
                    type="text" 
                    placeholder="Verification Code" 
                    icon="fi-tr-otp" 
                />

                <button
                    className="btn-dark center mt-14"
                    type="submit"
                    onClick = {handleSubmit}
                >
                    Verify Email
                </button>  

                <p className='mt-6 text-gray-600 text-xl text-center'>
                    Did not received code ? <Link to="" className='underline text-black text-xl ml-1'>Resend</Link>
                </p>


            </form>
        </section>
    </AnimationWrapper>
  )
}

export default VerifyEmail