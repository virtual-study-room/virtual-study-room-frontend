import React, { useContext, useState } from "react";
import Task from "./Task";
import { ToDoListDocument } from "../TodoList/TodoLists";
import { SERVER_BASE_URL } from "../App";
import { AuthContext } from "../auth/AuthContext";
interface ListProps {
  exitList: () => void;
  id: string;
  key: string;
  list: ToDoListDocument | null;
  grabLists: () => void;
}
export default function List(props: ListProps) {
  const { authToken } = useContext(AuthContext);
  const [input, setInput] = useState("");
  if (!props.list) {
    return <div>Internal Error</div>;
  }
  const tasks = props.list.items;
  // eslint-disable-next-line
  // const [title, setTitle] = useState("sample");
  // const [tasks, setTasks] = useState(["hi", "htere"]);

  const removeTask = async (i: number) => {
    // TODO: change this later to remove from database
    if (!props.list || !props.list.items) return;
    const newTasks = [...props.list.items];
    newTasks.splice(i, 1);
    const editToDoRes = await fetch(SERVER_BASE_URL + "/editToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({
        title: props.list.title,
        items: newTasks,
      }),
    });
    if (editToDoRes.status !== 200) {
      console.log("Error removing task");
      return;
    } else {
      console.log("Removed Task!");
      props.grabLists();
    }
    // console.log(i);
    // let newTasks = [...tasks];
    // newTasks.splice(i, 1);
    // setTasks(newTasks);
  };

  const addTask = async (task: string) => {
    if (!props.list || !props.list.items) return;
    const newTasks = [...props.list?.items, task];
    const editToDoRes = await fetch(SERVER_BASE_URL + "/editToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({
        title: props.list.title,
        items: newTasks,
      }),
    });
    if (editToDoRes.status !== 200) {
      console.log("Error adding task");
      return;
    } else {
      console.log("Added Task!");
      props.grabLists();
    }
    // TODO: change this later to add to database
    // setTasks([...tasks, task]);
    // setInput("");
  };

  // TODO: change this later to clear from database
  const clearTasks = async () => {
    if (!props.list || !props.list.items) return;
    const newTasks: string[] = [];
    const editToDoRes = await fetch(SERVER_BASE_URL + "/editToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({
        title: props.list.title,
        items: newTasks,
      }),
    });
    if (editToDoRes.status !== 200) {
      console.log("Error clearing tasks");
      return;
    } else {
      console.log("Cleared Tasks!");
      props.grabLists();
    }
  };

  const renderTasks = () => {
    if (!tasks) return [];
    return tasks.map((task, index) => (
      <Task
        remove={removeTask}
        content={task}
        index={index}
        key={task + index}
      />
    ));
  };

  const inputArea = () => {
    return (
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addTask(input)}>submit</button>
      </div>
    );
  };

  return (
    <div>
      <button onClick={props.exitList}>back</button>
      <div>{props.list.title}</div>
      <div>{renderTasks()}</div>
      <div>{inputArea()}</div>
      <button onClick={clearTasks}>clear</button>
    </div>
  );
}
