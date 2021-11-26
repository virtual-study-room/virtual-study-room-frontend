import React, { useState } from "react";
import Task from "./Task";
import '../styles/list.css'

interface ListProps {
  exitList: () => void;
  id: string;
}
export default function List(props: ListProps) {
  const [title, setTitle] = useState("sample");
  const [tasks, setTasks] = useState(["hi", "htere"]);
  const [input, setInput] = useState("");

  // TODO: set useEffect for grabbing title and tasks using props.id

  const removeTask = (i: number) => {
    // TODO: change this later to remove from database
    console.log(i);
    let newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  const addTask = (task: string) => {
    // TODO: change this later to add to database
    setTasks([...tasks, task]);
    setInput("");
  };

  // TODO: change this later to clear from database
  const clearTasks = () => setTasks([]);

  const renderTasks = () => {
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
          className = "list-input item-add"
        />
        <button className="submit-button" onClick={() => addTask(input)}>submit</button>
      </div>
    );
  };

  return (
    <div className="list">
      <button className="back-button" onClick={props.exitList}>back</button>
      <div className="list-title-indv">{title + props.id}</div>
      <div>{renderTasks()}</div>
      <div>{inputArea()}</div>
      <button className="submit-button cancel" onClick={clearTasks}>clear</button>
    </div>
  );
}
