import React from 'react'
import Button from './Button.tsx'

const TodoList = ({ data, handleCompleted, handleDelete }) => {
    // console.log(data)
    return (
        <div>
            {data?.map((item) =>
                <div key={item.id} className="w-full flex items-center justify-between border-2  px-5 border-black rounded-lg">
                    <input type="checkbox" value={item.id} checked={item.completed} className='text-4xl' onChange={handleCompleted} />
                    <span className={`${item.completed && 'line-through'}`}>{item.text}</span>
                    <Button title={'delete'} onClick={() => handleDelete(item.id)} />
                </div>
            )}
        </div>
    )
}
export default TodoList