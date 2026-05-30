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
    </div>
  )
}

export default InputComponent