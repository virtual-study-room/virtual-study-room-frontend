import React, { useState } from "react";
import Task from "./Task";

interface ListProps {
  exitList: () => void;
  id: string;
}
export default function List(props: ListProps) {
  // eslint-disable-next-line
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
        />
        <button onClick={() => addTask(input)}>submit</button>
      </div>
    );
  };

  return (
    <div>
      <button onClick={props.exitList}>back</button>
      <div>{title + props.id}</div>
      <div>{renderTasks()}</div>
      <div>{inputArea()}</div>
      <button onClick={clearTasks}>clear</button>
    </div>
  );
}
