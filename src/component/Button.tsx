import React from 'react'

const Button = ({ title, onClick, type }: { title?: String, onClick?: React.events, type?: String }) => {
  return (
    <button type={type} className="w-[120px] h-10 bg-blue-950 text-white uppercase font-serif rounded-r-md" onClick={onClick}>{title}</button>
  )
}
export default Button;