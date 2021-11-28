import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import TodoLists from "../TodoList/TodoLists";
import Login from "../login/Login";
import SetTimer from "../timer/setTimer";

export default function AuthenticatedRoute() {
  //For timer (values need to be here because setTimer is on another page and timer is in main)
  let [currentStudy, setCurrentStudy] = useState([0, 5]);
  let [currentBreak, setCurrentBreak] = useState([0, 5]);
  const { isValidToken } = useContext(AuthContext);
  const handleSubmit = (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => {
    setCurrentStudy(studyTime);
    setCurrentBreak(breakTime);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main currentBreak={currentBreak} currentStudy={currentStudy} />
          }
        />
        <Route path="/todo" element={<TodoLists />} />
        <Route
          path="/timer"
          element={<SetTimer handleSubmit={handleSubmit} />}
        />
        {/* Default: Main if logged in, or login if not logged in */}
        <Route
          path="*"
          element={
            isValidToken ? (
              <Main currentBreak={currentBreak} currentStudy={currentStudy} />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}