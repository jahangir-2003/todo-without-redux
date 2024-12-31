import React from 'react'

const Button = ({ title, onClick, type, className }: { title?: String, onClick?: React.events, type?: String, className?: string }) => {
  return (
    <button type={type} className={`px-4 h-10 bg-blue-950 text-white uppercase font-serif ${className}`} onClick={onClick}>{title}</button>
  )
}
export default Button;