import React, { useState } from "react";
import Task from "./Task.js";

export default function List(props) {
  const [title, setTitle] = useState("sample");
  const [tasks, setTasks] = useState(["hi", "htere"]);
  const [input, setInput] = useState("");

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

  const removeTask = (i) => {
    console.log(i);
    let newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
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

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setInput("");
  };

  const clearTasks = () => setTasks([]);

  return (
    <div>
      <div>{title}</div>
      <div>{renderTasks()}</div>
      <div>{inputArea()}</div>
      <button onClick={clearTasks}>clear</button>
    </div>
  );
}

// each line is a component
// checked or unchecked
// content
// delete line (from parent)
// input space
// textbox
// add line
// clear button
// are you sure?
