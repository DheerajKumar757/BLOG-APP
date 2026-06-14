import React, { useRef } from 'react'
import AnimationWrapper from '../common/page-animation'
import InputComponent from '../components/InputComponent'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const ResetPassword = () => {

    const verifyForm = useRef()
    const { pass_username, pass_param } = useParams();
    const navigate = useNavigate();

    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
    let digitsRegex = /^\d+$/; // regex for token

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
        let { password_one, password_two, token_verify  } = formData;

        if(!password_one.length || !password_two.length ) {
            return toast.error("Password is required")
        }
        if(password_one != password_two) {
            return toast.error("Password does not match")
        }
        if(!passwordRegex.test(password_one)) {
            return toast.error("Password should be between 6 to 20 characters and should contain at least one numeric digit, one uppercase and one lowercase letter")
        }
        if(!token_verify.length) {
            return toast.error("Verification Code can not be empty");
        }
        if(!digitsRegex.test(token_verify)) {
            return toast.error("Only digits are allowed in Verification Code.");
        }

        // transform JSON Keys according to server data.
        let serverData = {
            "new_password":password_one,
            "reset_pass_token":token_verify
        }

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/reset-password/" + pass_username + "/" + pass_param, serverData)
        .then(({ data }) => {
            toast.success(data.success);
            setTimeout(() => {
                navigate("/signin");
            }, 2000)
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
                    Reset Password
                </h1>

                <InputComponent 
                    name="password_one" 
                    type="password" 
                    placeholder="Password" 
                    icon="fi-rr-key" 
                />

                <InputComponent 
                    name="password_two"
                    type="password" 
                    placeholder="Password" 
                    icon="fi-rr-key" 
                />

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
                    Submit
                </button>  

                <p className='mt-6 text-gray-600 text-xl text-center'>
                    Did not received mail ? <Link to="/forget-password" className='underline text-black text-xl ml-1'>Retry</Link>
                </p>


            </form>
        </section>
    </AnimationWrapper>
  )
}

export default ResetPassword