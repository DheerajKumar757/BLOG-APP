import InputComponent from '../components/InputComponent'
import googleIcon from '../imgs/google.png'
import { Link } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../common/session'

const UserAuthFormPage = ({ type }) => {

    const authForm = useRef();

    const userAuthThroughServer = (ServerRouter, formData) => {
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + ServerRouter, formData)
        .then(({ data }) => {
            storeInSession("user", JSON.stringify(data));
            console.log(sessionStorage);
        })
        .catch(({ response }) => {
            toast.error(response.data.error);
        });

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let serverRoute = type == "signin" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // form data
        let form = new FormData(authForm.current);
        let formData = {};

        // key wil be the name of the input field and value will be the value entered by the user
        for(let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // destructuring form data
        let { fullname, email, password } = formData;

        if (fullname && fullname.length < 3) {
            return toast.error("Fullname should be at least 3 letters long");
        }

        if(!email.length) {
            return toast.error("Email is required");
        }

        if(!emailRegex.test(email)) {
            return toast.error("Email is invalid");
        }

        if(!password.length) {
            return toast.error("Password is required");
        }

        if(!passwordRegex.test(password)) {
            return toast.error("Password should be between 6 to 20 characters and should contain at least one numeric digit, one uppercase and one lowercase letter");
        }

        userAuthThroughServer(serverRoute, formData);
    }

  return (
    <AnimationWrapper keyValue={type}>
        <section className='h-cover flex items-center justify-center'>
            <Toaster />
            <form ref={authForm} className='w-[80%] max-w-[400px]'>
                <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                    {type == "signin" ? "Welcome Back!" : "Join us today"}
                </h1>

                {
                    type != "signin" ?
                    <InputComponent 
                        name="fullname" 
                        type="text" 
                        placeholder="Full Name" 
                        icon="fi-rr-user" 
                    />
                    : ""
                }

                <InputComponent 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    icon="fi-rr-envelope" 
                />

                <InputComponent 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    icon="fi-rr-key" 
                />

                <button
                    className="btn-dark center mt-14"
                    type="submit"
                    onClick={handleSubmit}
                >
                    {type == "signin" ? "Sign In" : "Sign Up"}
                </button>      

                <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
                    <hr className='w-1/2 border-back'/>
                    <p>or</p>
                    <hr className='w-1/2 border-back'/>    
                </div>  

                <button className="btn-dark flex gap-4 items-center justify-center center w-[90%]">
                    <img className="w-5 h-5" src={googleIcon} alt="Google Icon" />    
                    continue with google
                </button>  

                {
                    type == "signin" ?
                    <p className='mt-6 text-gray-600 text-xl text-center'>
                        Don't have an account ? <Link to="/signup" className='underline text-black text-xl ml-1'>Join us today.</Link>
                    </p>
                    :
                    <p className='mt-6 text-gray-600 text-xl text-center'>
                        Alreday a member ? <Link to="/signin" className='underline text-black text-xl ml-1'>Sign in here.</Link>
                    </p>
                }  
            </form>
        </section>
    </AnimationWrapper>
  )
}

export default UserAuthFormPage