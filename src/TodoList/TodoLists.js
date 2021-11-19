import React, { useState } from "react";
import List from "./List.js";

export default function TodoLists(props) {
  const [lists, setLists] = useState(["123", "456"]);
  const [titles, setTitles] = useState(["sample 123", "sample 456"]);

  const [singleView, setSingleView] = useState(false);
  const [currList, setCurrList] = useState(null);

  // TODO: set useEffect for grabbing lists and titles

  const gotoList = (id) => {
    setCurrList(id);
    setSingleView(!singleView);
    console.log(id);
  };

  const exitList = () => {
    setCurrList(null);
    setSingleView(!singleView);
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

  const renderSingleView = () => <List id={currList} exitList={exitList} />;

  return (
    <div className="App">
      {!singleView && renderLists()}
      {singleView && renderSingleView(currList)}
    </div>
  );
}
