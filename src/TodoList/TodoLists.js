import React, { useState } from "react";
import List from "./List.js";

export default function TodoLists(props) {
  const [lists, setLists] = useState(["123", "456"]);
  const [titles, setTitles] = useState(["sample 1", "sample 2"]);

  // TODO: set useEffect for grabbing lists and titles

  const gotoList = (id) => {
    // TODO: change this later to actually go to a new page using react router stuff
    // TODO: pass in id as a prop!!
    console.log(id);
    // <List id="12325" />
  };

  const deleteList = (i) => {
    // TODO: change this later to remove from database
    console.log(i);
    let newLists = [...lists];
    newLists.splice(i, 1);
    setLists(newLists);
  };

  // TODO: move styles to a css file
  const renderLists = () => {
    return lists.map((id, i) => (
      <div>
        <button onClick={() => gotoList(id)} style={{ margin: "10px" }}>
          <div style={{ height: "200px", width: "200px" }}>{titles[i]}</div>
        </button>
        <button
          onClick={() => deleteList(i)}
          style={{ position: "relative", right: "45px", top: "10px" }}
        >
          X
        </button>
      </div>
    ));
  };

  return (
    <div className="App">
      {/* <List listid="12325" /> */}
      {renderLists()}
    </div>
  );
}
