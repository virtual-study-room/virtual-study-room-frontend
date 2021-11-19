import React, { useState } from "react";

export default function Task(props) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <input type="checkbox" onClick={() => setIsChecked(!isChecked)}></input>
      <div>{props.content}</div>
      <button onClick={() => props.remove(props.index)}>delete</button>
    </div>
  );
}
