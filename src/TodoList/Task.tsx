import React, { useState } from "react";
import "./list.css";

interface TaskProps {
  remove: (i: number) => void;
  edit: (i: number) => void;
  content: string;
  index: number;
  checked: boolean;
}
export default function Task(props: TaskProps) {
  return (
    <div className="task" style={{ display: "flex", flexDirection: "row" }}>
      <label className="container">
        {props.content}
        <input
          type="checkbox"
          checked={props.checked}
          onClick={() => props.edit(props.index)}
        ></input>
        <span className="checkmark"></span>
      </label>
      <button
        className="close-button list-close"
        onClick={() => props.remove(props.index)}
      >
        X
      </button>
    </div>
  );
}
