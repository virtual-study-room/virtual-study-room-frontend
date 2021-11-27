import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import { AuthContext } from "../auth/AuthContext";
import {
  ToDoListDocument,
  getUntrashedLists,
  getTrashedLists,
  attemptDeleteList,
  attemptAddList,
  attemptRestoreList,
} from "./ToDoListDatabaseUtils";

export default function TodoLists() {
  const { user, authToken } = useContext(AuthContext);
  const [listDocuments, setListDocuments] = useState<ToDoListDocument[]>([]);
  const [trashedListDocuments, setTrashedListDocuments] = useState<
    ToDoListDocument[]
  >([]);

  const [singleView, setSingleView] = useState(false);
  const [currList, setCurrList] = useState("");
  const [addingList, setAddingList] = useState(false);
  const [input, setInput] = useState("");

  //mapping listDocuments to list titles
  const titles = listDocuments.map((list) => list.title);

  //mapping trashedListDocuments to list titles
  // eslint-disable-next-line
  const trashedTitles = trashedListDocuments.map((list) => list.title);

  //function to grab updated lists: both the trashed and untrashed
  async function grabLists() {
    console.log("Entered!");
    console.log(user);
    if (!user) return;
    // const dbLists = await getUntrashedLists(authToken);
    const dbLists = await Promise.all([
      getUntrashedLists(authToken),
      getTrashedLists(authToken),
    ]);
    console.log(dbLists);
    const [untrashedLists, trashedLists] = dbLists;
    setListDocuments(untrashedLists);
    setTrashedListDocuments(trashedLists);
  }
  // TODO: set useEffect for grabbing lists and titles
  //useEffect for grabbing lists when mounted or when user loads in
  useEffect(() => {
    grabLists();
    // eslint-disable-next-line
  }, [user]);

  const gotoList = (id: string) => {
    setCurrList(id);
    setSingleView(!singleView);
    console.log(id);
  };

  const exitList = () => {
    setCurrList("");
    setSingleView(!singleView);
  };

  const deleteList = async (title: string) => {
    if (!user) return;
    const successfulDelete = await attemptDeleteList(title, authToken);
    if (successfulDelete) {
      console.log("Successfully deleted list.");
      await grabLists();
    } else {
      console.log("Error deleting list.");
    }
  };

  const addList = async (title: string) => {
    if (!user) return;
    const successfulAdd = await attemptAddList(title, authToken);
    if (successfulAdd) {
      console.log("Successfully added list.");
      //update UI if successful
      await grabLists();
    } else {
      console.log("Error adding list.");
    }
  };

  //function to restore a trashed list
  //TODO: Use restoreTrashedList
  // eslint-disable-next-line
  async function restoreTrashedList(title: string) {
    const successfulRestore = await attemptRestoreList(title, authToken);
    if (successfulRestore) {
      console.log("Successfully restored list");
      await grabLists();
    } else {
      console.log("Failure restoring list.");
    }
  }

  // TODO: move styles to a css file
  const renderLists = () => {
    return listDocuments.map((list, i) => (
      <div key={list.title}>
        <button onClick={() => gotoList(list.title)} style={{ margin: "10px" }}>
          <div style={{ height: "200px", width: "200px" }}>{titles[i]}</div>
        </button>
        <button
          onClick={() => deleteList(list.title)}
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

  //TODO: Make a renderTrashedList function, and add in functionality to restore a trashed list

  function getCurrentListDoc(id: string) {
    for (let list of listDocuments) {
      if (list.title === id) return list;
    }
    return null;
  }
  const renderSingleView = () => (
    <List
      key={currList}
      id={currList}
      list={getCurrentListDoc(currList)}
      exitList={exitList}
      grabLists={grabLists}
    />
  );

  return (
    <div className="App">
      {!singleView && renderLists()}
      {!singleView && renderListAdder()}
      {singleView && renderSingleView()}
      <Link to="/">Exit</Link>
    </div>
  );
}
