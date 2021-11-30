import React, { useContext, useState } from "react";
import Task from "./Task";
import { ToDoListDocument } from "../TodoList/ToDoListDatabaseUtils";
import { SERVER_BASE_URL } from "../App";
import { AuthContext } from "../auth/AuthContext";
import "./list.css";
import "../styles/App.css";

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
    const newTasks = [...props.list?.items, [task, false]];
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
      setInput("");
    }
    // TODO: change this later to add to database
    // setTasks([...tasks, task]);
    // setInput("");
  };

  const editTask = async (i: number) => {
    if (!props.list || !props.list.items) return;
    const newTasks = [...props.list.items];
    console.log(newTasks);
    newTasks[i][1] = !newTasks[i][1];
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
      console.log("Updated task state!");
      props.grabLists();
    }
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
        edit={editTask}
        content={task[0]}
        index={index}
        key={task[0] + index}
        checked={task[1]}
      />
    ));
  };

  const inputArea = () => {
    return (
      <div id="list-inputArea">
        <input
          className="list-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") addTask(input);
          }}
        />
        <button className="button" onClick={() => addTask(input)}>
          submit
        </button>
      </div>
    );
  };

  return (
    <div className="card">
      <button className="back-button" onClick={props.exitList}>
        all lists
      </button>
      <div className="list-title-indv">{props.list.title}</div>
      <div className="card-tasks">{renderTasks()}</div>
      <div>{inputArea()}</div>
      <button className="submit-button cancel" onClick={clearTasks}>
        clear
      </button>
    </div>
  );
}
