import React, { useState } from 'react'
import Input from './component/Input.tsx'
import Button from './component/Button.tsx'
import TodoList from './component/TodoList.tsx'

const App = () => {
  const [todo, setTodo] = useState<string>("")
  const [data, setData] = useState<Array>([])
  // let data = []
  // console.log(todo)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }
  const handleSubmit = () => {
    const newData = {
      text: todo,
      id: new Date().getTime(),
      completed: true
    }
    setData([...data, newData])
    // data.push(newData)
  }
  const handleCompleted = (id) => {
    console.log(id.target.checked)
    console.log(id.target.value)

  }
  const handleDelete = (id) => {
    console.log(id)
    console.log(data)
    const res = data.filter((item) => item.id != id)
    setData(res)
  }
  return (
    <div className="w-full h-screen flex items-center flex-col  mx-auto">
      <h2 className="text-2xl uppercase font-bold">This is todo app</h2>
      <div className="flex flex-row items-center w-[90%] md:w-[80%]  gap-4">
        <Input value={todo} onChange={handleChange} />
        <Button title={"Add"} onClick={handleSubmit} />
      </div>
      <div className="w-[90%] md:w-[80%] ">

        <TodoList data={data} handleCompleted={handleCompleted} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App