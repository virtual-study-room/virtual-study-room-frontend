import React, { useContext, useEffect, useState } from "react";
import { ObjectId } from "mongoose";
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from "../App";
import List from "./List";
import { AuthContext } from "../auth/AuthContext";

export interface ToDoListDocument {
  userID: string;
  _id: ObjectId;
  title: string;
  date?: Date;
  trashed?: boolean;
  items?: string[];
}

interface AllToDoLists {
  toDos: ToDoListDocument[];
}

export default function TodoLists() {
  const { user, authToken } = useContext(AuthContext);
  const [listDocuments, setListDocuments] = useState<ToDoListDocument[]>([]);
  //const [lists, setLists] = useState(["123", "456"]);

  const [singleView, setSingleView] = useState(false);
  const [currList, setCurrList] = useState("");
  const [addingList, setAddingList] = useState(false);
  const [input, setInput] = useState("");

  //mapping listDocuments to list titles
  const titles = listDocuments.map((list) => list.title);

  //function to grab updated lists:
  async function grabLists() {
    console.log("Entered!");
    console.log(user);
    if (!user) return;
    const dbLists = await getAllLists(authToken);
    console.log("dbLists are: " + dbLists);
    setListDocuments(dbLists);
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
    const deleteListRes = await fetch(SERVER_BASE_URL + "/trashToDo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authToken,
      },
      body: JSON.stringify({
        userID: user.username,
        title: title,
      }),
    });
    if (deleteListRes.status !== 200) {
      console.log("Error deleting list.");
      return;
    } else {
      grabLists();
    }

    // TODO: change this later to remove from database
    //console.log(i);
    //let newLists = [...lists];
    //newLists.splice(i, 1);
    //setLists(newLists);
  };

  const addList = async (title: string) => {
    if (!user) return;
    const addListRes = await fetch(SERVER_BASE_URL + "/addToDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authToken,
      },
      //sending a blank list
      body: JSON.stringify({
        userID: user.username,
        title: title,
        items: [],
      }),
    });
    if (addListRes.status !== 200) {
      console.log("Error adding list");
    } else {
      //update UI once added
      await grabLists();
    }

    //let newLists = [...lists];
    //newLists.push("id-grabbed-from-database?");
    //setLists(newLists);
    // let newTitles = [...titles];
    // newTitles.push(input);
    //setTitles(newTitles);
  };

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

async function getAllLists(authToken: string) {
  const getListRes = await fetch(SERVER_BASE_URL + "/getAllToDos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
  });
  if (getListRes.status !== 200) {
    console.log("Error getting lists!");
    return [];
  }
  const listResData: AllToDoLists = await getListRes.json();
  console.log(listResData.toDos);
  return listResData.toDos;
}
