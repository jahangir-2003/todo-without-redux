import React from 'react'
import Button from './Button.tsx'
import { CiEdit } from 'react-icons/ci'

const TodoList = ({ data, handleCompleted, handleDelete, handleEdit }) => {

    return (
        <div className="flex flex-col gap-2">
            {data.length > 0 ? data?.map((item: { text: string, id: number, completed: boolean }) =>
                <div key={item.id} className="w-full flex items-center justify-between border-2  pl-5 shadow-2xl border-black shadow-red-400 rounded-lg gap-5">
                    <input type="checkbox" value={item.id} checked={item.completed} className="w-4 h-4 text-white" onChange={handleCompleted} />
                    <span className={`${item.completed ? 'line-through text-black' : "text-green-950"} text-xl `}>{item.text}</span>
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <button onClick={() => handleEdit(item.id)} className="w-[50px] flex items-center justify-center text-white  bg-green-800 shadow-lg h-10 text-2xl"><CiEdit /></button>
                        <Button title={'delete'} onClick={() => handleDelete(item.id)} />
                    </div>
                </div>
            ) : <div className="flex items-center justify-center h-32">
                <h1 className=' text-2xl capitalize'>no any task </h1></div>}
        </div>
    )
}

export default TodoList