import React from 'react'

const Input = ({ name, value, onChange }) => {
  return (
    <div className="w-full mx-auto">
      <label htmlFor="simple-input" className="sr-only">Enter a to-do</label>
      <input
        type="text"
        id="simple-input"
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Enter a to-do item"
        className={`w-full h-10  p-2 rounded-l-md mx-auto focus:outline-none`}
      />
    </div>
  )
}

export default Input;
