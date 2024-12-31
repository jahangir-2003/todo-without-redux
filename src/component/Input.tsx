import React from 'react'

const Input = ({ name, value, onChange, placeholder, className }: { name: string, value: string, onChange: any, placeholder: string, className?: string }) => {
  return (
    <div className="w-full mx-auto">
      <label htmlFor="simple-input" className="sr-only">Enter a to-do</label>
      <input
        type="text"
        id="simple-input"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-10  p-2 rounded-md mx-auto focus:outline-none ${className}`}
      />
    </div>
  )
}

export default Input;
