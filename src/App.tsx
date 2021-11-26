import Login from "./login/Login";
import Register from "./register/register";
import Main from "./main/Main";
import TodoLists from "./TodoList/TodoLists";
import SetTimer from "./timer/setTimer";
import { Routes,Route,BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  
  //For timer (values need to be here because setTimer is on another page and timer is in main)
  let [currentStudy,setCurrentStudy] = useState([0,5]); 
  let [currentBreak,setCurrentBreak] = useState([0,5]);  
  const handleSubmit = (studyTime:[number,number],breakTime:[number,number]) => {
    setCurrentStudy(studyTime);
    setCurrentBreak(breakTime);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main currentBreak={currentBreak} currentStudy={currentStudy}/>} />
        <Route path="/todo" element={<TodoLists />} />
        <Route path="/timer" element={<SetTimer handleSubmit={handleSubmit}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
