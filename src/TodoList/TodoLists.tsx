import React, { useState } from "react";
import List from "./List";
import '../styles/list.css'

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
        <button className="list-button" onClick={() => gotoList(id)} style={{ margin: "10px" }}>
          <div className="list-title">{titles[i]}</div>
        </button>
        <button
          onClick={() => deleteList(i)}
          style={{ position: "relative", right: "45px", top: "-15px" }}
          className='close-button'
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
          className="list-input"
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="submit-button" onClick={() => addList(input)}>submit</button>
        <button className="submit-button cancel" onClick={() => setAddingList(!addingList)}>cancel</button>
      </div>
    ) : (
      <button className="button" onClick={() => setAddingList(!addingList)}>add new list</button>
    );
  };

  const renderSingleView = () => <List id={currList} exitList={exitList} />;

  return (
    <div>
      <div className="lists">
        {!singleView && renderLists()}
      </div>
      {!singleView && renderListAdder()}
      {singleView && renderSingleView()}
    </div>
  );
}
