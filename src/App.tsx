import React, { useState } from 'react'
import Input from './component/Input.tsx'
import Button from './component/Button.tsx'
import TodoList from './component/TodoList.tsx'

type todotype = { text: string, id: number, completed: boolean }
const App = () => {
  const [todo, setTodo] = useState<string>("")
  const [data, setData] = useState<todotype[]>([])
  const [show, setShow] = useState<string>("")
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<todotype>({
    text: "",
    id: null,
    completed: false
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "add") {
      setTodo(e.target.value);
    } else if (e.target.name === "update" && updateData.id !== null) {
      setUpdateData({ ...updateData, text: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (todo.trim() === "") return;
    const newData = {
      text: todo,
      id: new Date().getTime(),
      completed: false
    }
    setData([...data, newData])
    setTodo("")
  }

  const handleCompleted = (id: React.ChangeEvent<HTMLInputElement>) => {
    const Id = parseInt(id.target.value)
    setData(data.map((item: todotype) =>
      item.id === Id ? { ...item, completed: !item.completed } : item
    ))
  }

  const handleDelete = (id: number) => {
    setData(data.filter((item: todotype) => item.id !== id))
  }

  const handleEdit = (id: number) => {
    setIsUpdate(true);
    const filtered = data.find((item: todotype) => item.id === id);
    if (filtered) {
      setUpdateData(filtered);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setData(data.map((item: todotype) =>
      item.id === updateData.id ? { ...item, text: updateData.text } : item
    ))
    setIsUpdate(false)
  }

  const activeData = data.filter((item: todotype) => !item.completed)
  const completedData = data.filter((item: todotype) => item.completed)
  const filteredData = show === "active" ? activeData : show === "completed" ? completedData : data

  return (
    <div className="w-full h-screen flex items-center flex-col mx-auto bg-gradient-to-b from-green-400 to-blue-600">
      <h2 className="text-2xl uppercase font-bold">This is todo app</h2>
      {isUpdate ? <form onSubmit={handleUpdate} className="flex flex-row items-center w-[90%] md:w-[70%] border-2 border-black shadow-xl  rounded-lg">
        <Input name="update" value={updateData.text} onChange={handleChange} />
        <Button type={"submit"} title={"update"} />
      </form> : <form onSubmit={handleSubmit} className="flex flex-row items-center w-[90%] md:w-[70%] border-2 border-black shadow-xl  rounded-lg">
        <Input name='add' value={todo} onChange={handleChange} />
        <Button type={"submit"} title={"add"} />
      </form>}
      <div className="flex gap-10 text-xl my-4">
        <button onClick={() => setShow("")} className="capitalize font-semibold focus:underline underline-offset-4">Todos</button>
        <button onClick={() => setShow("active")} className="capitalize font-semibold focus:underline underline-offset-4">Active</button>
        <button onClick={() => setShow("completed")} className="capitalize font-semibold focus:underline underline-offset-4">Completed</button>
      </div>
      <div className="w-[90%] md:w-[70%]">
        <TodoList data={filteredData} handleCompleted={handleCompleted} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  )
}

export default App;



// import React, { useState } from 'react'
// import Input from './component/Input.tsx'
// import Button from './component/Button.tsx'
// import TodoList from './component/TodoList.tsx'

// const App = () => {
//   const [todo, setTodo] = useState<string>("")
//   const [data, setData] = useState<[]>([])
//   const [show, setShow] = useState<String>("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTodo(e.target.value)
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const newData = {
//       text: todo,
//       id: new Date().getTime(),
//       completed: false
//     }
//     setData([...data, newData])
//     setTodo("")
//     // data.push(newData)
//   }

//   const handleCompleted = (id) => {
//     console.log(data)

//     const event = id.target;
//     const filted = data.filter((item) =>
//       item.id == event.value
//     )

//     const updated = filted[0].completed = !filted[0].completed
//     // console.log(filted[0].completed)
//     setData([...data, updated])


//   }

//   const handleDelete = (id) => {
//     console.log(id)
//     console.log(data)
//     const res = data.filter((item) => item.id !== id)
//     setData(res)
//   }

//   const ActiveData = data.filter((item) => item.completed !== true)
//   const CompeltedData = data.filter((item) => item.completed === true)


//   return (
//     <div className="w-full h-screen flex items-center flex-col  mx-auto">
//       <h2 className="text-2xl uppercase font-bold">This is todo app</h2>
//       <form onSubmit={handleSubmit} className="flex flex-row items-center w-[90%] md:w-[80%]  gap-4">
//         <Input value={todo} onChange={handleChange} />
//         <Button type={"submit"} title={"Add"} />
//       </form>
//       <div className="flex gap-10 text-xl my-4">
//         <button onClick={() => setShow("")} className="capitalize font-semibold focus:underline underline-offset-4">Todos</button>
//         <button onClick={() => setShow("")} className="capitalize font-semibold focus:underline underline-offset-4">Active</button>
//         <button onClick={() => setShow("")} className="capitalize font-semibold focus:underline underline-offset-4">Completed</button>
//       </div>
//       <div className="w-[90%] md:w-[80%]">
//         <TodoList data={data} handleCompleted={handleCompleted} handleDelete={handleDelete} />
//       </div>
//     </div>
//   )
// }

// export default App