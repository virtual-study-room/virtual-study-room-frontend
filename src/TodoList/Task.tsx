import React, { useState } from "react";
import '../styles/list.css'

interface TaskProps {
  remove: (index: number) => void;
  content: string;
  index: number;
}
export default function Task(props: TaskProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <label className="container">{props.content}
        <input type="checkbox" onClick={() => setIsChecked(!isChecked)}></input>
        <span className="checkmark"></span>
      </label>
      <button className="close-button list-close" onClick={() => props.remove(props.index)}>X</button>
    </div>
  );
}
