import React from 'react'

const InputComponent = ({ name, type, id, value, placeholder}) => {
  return (
    <div className='relative w-[100%] mb-4'>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            defaultValue={value}
            id={id}
            className='input-box'
        />

        <i className='fi fi-rr-user input-icon'></i>
    </div>
  )
}

export default InputComponent