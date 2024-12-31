import React, { Fragment } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Button from "./Button.tsx";
import Input from "./Input.tsx";
import { AiOutlineCheck } from "react-icons/ai";

type TodoType = { text: string; id: number; completed: boolean };

interface TodoListProps {
    data: TodoType[];
    handleCompleted: (id: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
    updateData: TodoType;
    setUpdate: React.Dispatch<React.SetStateAction<TodoType>>;
    handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
    error: { add: string; update: string };
}

const TodoList: React.FC<TodoListProps> = ({
    data,
    handleCompleted,
    handleDelete,
    handleEdit,
    updateData,
    setUpdate,
    handleUpdate,
    error,
}) => {
    return (
        <div
            className="flex flex-col gap-2 overflow-x-auto scroll-auto scroll-m-1 py-5"
            style={{ height: "calc(100vh - 250px)" }}
        >
            {data.length > 0 ? (
                data?.map((item: { text: string; id: number; completed: boolean }) => (
                    <Fragment key={item.id}>
                        <div className="w-full min-h-12 flex items-center justify-between border-2  pl-5 shadow-md border-slate-200 rounded-md">
                            {item.id === updateData.id ? (
                                <>
                                    <form
                                        onSubmit={handleUpdate}
                                        className="flex flex-row justify-between w-full"
                                    >
                                        <Input
                                            name="update"
                                            placeholder="Enter updated data "
                                            value={updateData.text}
                                            onChange={(e) =>
                                                setUpdate({ ...updateData, text: e.target.value })
                                            }
                                        />
                                        <Button
                                            type="submit"
                                            title="Update"
                                            onClick={handleUpdate}
                                            className="rounded-r-md"
                                        />
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row items-center h-full gap-5">
                                        <input
                                            type="checkbox"
                                            value={item.id}
                                            checked={item.completed}
                                            className="w-4 h-4 text-white"
                                            onChange={(e) =>
                                                handleCompleted(parseInt(e.target.value))
                                            }
                                        />
                                        <button
                                            onClick={() => handleCompleted(item.id)}
                                            className={`${item.completed
                                                    ? "line-through text-black"
                                                    : "text-green-950"
                                                } text-xl `}
                                        >
                                            {item.text}
                                        </button>
                                    </div>
                                    {item.completed ? (
                                        <div className="flex flex-row mr-1">
                                            <h2 className="bg-green-800 text-white h-8 w-10 mr-1 capitalize  flex items-center justify-center rounded-sm text-2xl ">
                                                <AiOutlineCheck />
                                            </h2>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 hover:bg-red-700   h-8 w-10 rounded-sm  flex items-center justify-center text-2xl text-white "
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center gap-1 justify-center mr-1">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="bg-green-800 hover:bg-green-900 h-8 rounded-sm w-10 flex items-center justify-center text-2xl text-white "
                                            >
                                                <CiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="bg-red-500 hover:bg-red-700   h-8 rounded-sm w-10 flex items-center justify-center text-2xl text-white "
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {error.update && updateData.id === item.id && (
                            <span className="text-red-700">{error.update}</span>
                        )}
                    </Fragment>
                ))
            ) : (
                <div className="flex items-center justify-center h-32">
                    <h1 className=" text-2xl capitalize">no any todo </h1>
                </div>
            )}
        </div>
    );
};

export default TodoList;
