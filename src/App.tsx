import React, { useState } from "react";
import Input from "./component/Input.tsx";
import Button from "./component/Button.tsx";
import TodoList from "./component/TodoList.tsx";
import { FaSearch } from "react-icons/fa";

type todotype = { text: string; id: number; completed: boolean };
const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [data, setData] = useState<todotype[]>([]);
  const [show, setShow] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [updateData, setUpdateData] = useState<todotype>({
    text: "",
    id: null,
    completed: false,
  });
  const [error, setError] = useState<{ add: string; update: string }>({
    add: "",
    update: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "add") {
      setTodo(e.target.value);
      setError({ ...error, add: "" });
    } else if (e.target.name === "update" && updateData.id !== null) {
      setUpdateData({ ...updateData, text: e.target.value });
      setError({ ...error, update: "" });
    } else if (e.target.name === "search") {
      setSearchQuery(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim().length < 5) {
      setError({
        ...error,
        add: "Content should be greater than 5 characters",
      });
      return;
    } else if (todo.trim().length > 50) {
      setError({ ...error, add: "Content should be less than 50 characters" });
      return;
    }

    const newData = {
      text: todo,
      id: new Date().getTime(),
      completed: false,
    };
    setData([newData, ...data]);
    setTodo("");
  };

  const handleCompleted = (id: number) => {
    setData(
      data.map((item: todotype) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item: todotype) => item.id !== id));
  };


  const handleEdit = (id: number) => {
    const filtered = data.find((item: todotype) => item.id === id);
    if (filtered) {
      setUpdateData(filtered);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateData.text.trim().length < 5) {
      setError({
        ...error,
        update: "Content should be greater than 5 characters",
      });
      return;
    } else if (updateData.text.trim().length > 50) {
      setError({
        ...error,
        update: "Content should be less than 50 characters",
      });
      return;
    }
    setData(
      data.map((item: todotype) =>
        item.id === updateData.id ? { ...item, text: updateData.text } : item
      )
    );
    setUpdateData({ id: "", completed: false, text: "" });
    setError({ ...error, update: "" });
  };

  const activeData = data.filter((item: todotype) => !item.completed);
  const completedData = data.filter((item: todotype) => item.completed);
  let filteredData =
    show === "active"
      ? activeData
      : show === "completed"
        ? completedData
        : data;
  if (searchQuery.trim().length > 0) {
    filteredData = filteredData.filter((item: todotype) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="w-full max-h-screen flex items-center flex-col mx-auto">
      <h2 className="text-2xl uppercase font-bold mt-7 font-serif underline underline-offset-4 mb-5">
        This is todo app
      </h2>
      <div className="flex flex-col items-center md:flex-row justify-between w-[90%] md:w-[70%] md:gap-4">
        <div className="w-full ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-row items-center w-full  border-2 border-slate-300 shadow-sm rounded-md"
          >
            <Input
              placeholder="Enter todos"
              name="add"
              value={todo}
              onChange={handleChange}
              className={`${error.add && "border-2 border-red-700"
                } rounded-r-none`}
            />
            <Button type={"submit"} title={"add"} className="rounded-r-md" />
          </form>
          {error.add && <span className="text-red-700">{error.add}</span>}
        </div>

        <div className="flex flex-row items-center w-full md:w-[60%]  border-2 border-slate-300 shadow-sm rounded-md my-5">
          <span className="w-10 h-full flex items-center justify-center text-slate-500">
            <FaSearch />
          </span>
          <Input
            name="search"
            value={searchQuery}
            placeholder="Search todos here"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

        </div>
      </div>
      <div className="flex gap-6 sm:gap-10 text-xl my-4">
        <button
          onClick={() => setShow("")}
          className={`capitalize font-semibold ${show === "" && "underline underline-offset-4"
            }`}
        >
          Todos
        </button>
        <button
          onClick={() => setShow("active")}
          className={`capitalize font-semibold ${show === "active" && "underline underline-offset-4"
            }`}
        >
          Active
        </button>
        <button
          onClick={() => setShow("completed")}
          className={`capitalize font-semibold ${show === "completed" && "underline underline-offset-4"
            } `}
        >
          Completed
        </button>
      </div>
      <div className="w-[90%] md:w-[70%] mb-10">
        <TodoList
          data={filteredData}
          handleCompleted={handleCompleted}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          updateData={updateData}
          handleUpdate={handleUpdate}
          setUpdate={setUpdateData}
          error={error}
        />
      </div>
    </div>
  );
};

export default App;
