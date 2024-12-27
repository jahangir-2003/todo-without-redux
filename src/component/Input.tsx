import React from 'react'

const Input = ({value,onChange}) => {
  return (
    <div className="w-full mx-auto">
        <input 
        type="text"
        id="simple-input"
        value={value}
        onChange={onChange}
        placeholder="Enter for to do" className="w-full flex h-10 rounded-md p-2 mx-auto "/>
    </div>
  )
}

export default Input