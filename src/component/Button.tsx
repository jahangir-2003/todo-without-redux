import React from 'react'

const Button = ({title,onClick}) => {
  return (
    <button className="w-[120px] h-10 bg-blue-950 text-white uppercase font-serif rounded-md border my-2 " onClick={onClick}>{title}</button>
  )
}

export default Button