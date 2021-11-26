import React, { useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";

export default function TodoLists() {
  const [lists, setLists] = useState(["123", "456"]);
  const [titles, setTitles] = useState(["sample 123", "sample 456"]);

  const [singleView, setSingleView] = useState(false);
  const [currList, setCurrList] = useState("");
  const [addingList, setAddingList] = useState(false);
  const [input, setInput] = useState("");

  // TODO: set useEffect for grabbing lists and titles

  const gotoList = (id: string) => {
    setCurrList(id);
    setSingleView(!singleView);
    console.log(id);
  };

  const exitList = () => {
    setCurrList("");
    setSingleView(!singleView);
  };

  const deleteList = (i: number) => {
    // TODO: change this later to remove from database
    console.log(i);
    let newLists = [...lists];
    newLists.splice(i, 1);
    setLists(newLists);
  };

  const addList = (input: string) => {
    // TODO: change this later to add to database
    let newLists = [...lists];
    newLists.push("id-grabbed-from-database?");
    setLists(newLists);
    let newTitles = [...titles];
    newTitles.push(input);
    setTitles(newTitles);
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

  const renderListAdder = () => {
    return addingList ? (
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => addList(input)}>submit</button>
        <button onClick={() => setAddingList(!addingList)}>cancel</button>
      </div>
    ) : (
      <button onClick={() => setAddingList(!addingList)}>Add New List</button>
    );
  };

  const renderSingleView = () => <List id={currList} exitList={exitList} />;

  return (
    <div className="App">
      {!singleView && renderLists()}
      {!singleView && renderListAdder()}
      {singleView && renderSingleView()}
      <Link to="/main">Exit</Link>
    </div>
  );
}
