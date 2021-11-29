import { SERVER_BASE_URL } from "../App";
import { ObjectId } from "mongoose";

interface AllToDoLists {
  toDos: ToDoListDocument[];
}
export interface ToDoListDocument {
  userID: string;
  _id: ObjectId;
  title: string;
  date: Date;
  trashed?: boolean;
  items?: string[];
}
export async function getUntrashedLists(authToken: string) {
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

export async function getTrashedLists(authToken: string) {
  const getTrashedRes = await fetch(SERVER_BASE_URL + "/getAllTrashedToDos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
  });

  if (getTrashedRes.status !== 200) {
    console.log("Error getting trashed lists.");
    return [];
  } else {
    const trashedData: AllToDoLists = await getTrashedRes.json();
    return trashedData.toDos;
  }
}

export async function attemptRestoreList(title: string, authToken: string) {
  const restoreTrashedRes = await fetch(SERVER_BASE_URL + "/restoreToDo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  if (restoreTrashedRes.status !== 200) {
    return false;
  } else {
    return true;
  }
}

export async function attemptAddList(title: string, authToken: string) {
  const addListRes = await fetch(SERVER_BASE_URL + "/addToDo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
    //sending a blank list
    body: JSON.stringify({
      title: title,
      items: [],
    }),
  });
  if (addListRes.status !== 200) {
    return false;
  } else {
    return true;
  }
}

export async function attemptDeleteList(title: string, authToken: string) {
  const deleteListRes = await fetch(SERVER_BASE_URL + "/trashToDo", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  if (deleteListRes.status !== 200) {
    return false;
  } else {
    return true;
  }
}
