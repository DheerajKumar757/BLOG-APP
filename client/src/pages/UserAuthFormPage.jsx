import React from 'react'
import InputComponent from '../components/InputComponent'

const UserAuthFormPage = ({ type }) => {
  return (
    <section className='h-cover flex items-center justify-center'>
        <form className='w-[80%] max-w-[400px]'>
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
                       
        </form>

    </section>
  )
}

export default UserAuthFormPage