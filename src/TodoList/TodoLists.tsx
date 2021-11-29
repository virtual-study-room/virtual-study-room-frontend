import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import "./list.css"
import { AuthContext } from "../auth/AuthContext";
import {
  ToDoListDocument,
  getUntrashedLists,
  getTrashedLists,
  attemptDeleteList,
  attemptAddList,
  attemptRestoreList,
} from "./ToDoListDatabaseUtils";
import "./list.css";

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
  const [trashView, setTrashView] = useState(false);

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

  const deleteList = async (title: string, batch: boolean) => {
    if (!user) return;
    // confirm msg
    let message = "Are you sure you want to delete this list?";
    if (trashView) message += " You will not be able to recover it.";
    if (!batch && window.confirm(message)) {
      const successfulDelete = await attemptDeleteList(title, authToken);
      if (successfulDelete) {
        console.log("Successfully deleted list.");
        await grabLists();
      } else {
        console.log("Error deleting list.");
      }
    } else if (batch) {
      const successfulDelete = await attemptDeleteList(title, authToken);
      if (successfulDelete) {
        console.log("Successfully deleted list.");
        await grabLists();
      } else {
        console.log("Error deleting list.");
      }
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
      console.log("Error adding list");
      alert(
        "There is a duplicate list title on your account. List titles must be unique!"
      );
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
        <button className="list-button" onClick={() => gotoList(list.title)} style={{ margin: "10px" }}>
          <div className="list-title">{list.title}</div>
        </button>
        <button
          onClick={() => deleteList(list.title, false)}
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
        <input className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button" onClick={() => addList(input)}>submit</button>
        <button className="button action" onClick={() => setAddingList(!addingList)}>cancel</button>
      </div>
    ) : (
      <button className="button add" onClick={() => setAddingList(!addingList)}>+</button>
    );
  };

  const renderTrashedLists = () => {
    const trashedListsToShow = trashedListDocuments // find 5 most recently deleted lists
      .sort((a, b) => {
        if (a.date < b.date) return 1;
        else return -1;
      })
      .slice(0, 5);

    return trashedListsToShow.map((list, i) => (
      <div key={list.title}>
        <div>
          <button className="list-button" style={{ margin: "10px" }}>
            <div className="list-title">{list.title}</div>
          </button>
          <button
            className='close-button'
            onClick={() => deleteList(list.title, false)}
            style={{ position: "relative", right: "45px", top: "-15px" }}
          >
            x
          </button>
        </div>
        
        <button
          className='button restore'
          onClick={() => restoreTrashedList(list.title)}
          // style={{ position: "relative", left: "0", top: "0" }}
        >
          restore
        </button>
      </div>
    ));
  };

  const clearTrash = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your deleted lists? You will not be able to recover any of them."
      )
    )
      trashedListDocuments.forEach((list) => deleteList(list.title, true));
  };

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
      {!singleView && <div className="toggle">
        <button
          onClick={() => setTrashView(false)}
          className={!trashView ? "button" : "button not-selected"}
        >
          Current Lists
        </button>
        <button
          onClick={() => setTrashView(true)}
          className={!trashView ? "button not-selected" : "button"}
        >
          Deleted Lists
        </button>
      </div>}
      <div className="list-container">
        {!singleView && !trashView && renderLists()}
        {!singleView && !trashView && renderListAdder()}
        {!singleView && trashView && renderTrashedLists()}
        {!singleView && trashView && (
          <button className="button action clear" onClick={() => clearTrash()}>🗑️</button>
        )}
        {singleView && renderSingleView()}
      </div>
      
      
      <Link to="/" className="exit">◀</Link>
    </div>
  );
}
