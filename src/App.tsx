import { useState, useContext } from "react";
//import { AsmrSlider, Noise } from "./asmrSlider/asmrSlider";
import SetTimer from "./timer/setTimer";
//import Timer from "./timer/timer";
import TodoLists from "./TodoList/TodoLists";
//import ImageUpload from "./ImageUpload/ImageUpload";
import Login from "./login/Login";
import Register from "./register/register";
import Main from "./main/Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthContext, AuthProvider } from "./auth/AuthContext";

//wraps our app with the auth provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
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

  //show main page and todo if logged in, or login/register if not logged in
  return isValidToken ? (
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
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// function App() {
//   let [showSetTimer, setShowSetTimer] = useState(false);
//   let [studyActive, setStudyActive] = useState(true);
//   let [currentStudy, setCurrentStudy] = useState([0, 10]);
//   let [currentBreak, setCurrentBreak] = useState([0, 10]);

//   const handleSubmit = (
//     studyTime: [number, number],
//     breakTime: [number, number]
//   ) => {
//     setCurrentStudy(studyTime);
//     setCurrentBreak(breakTime);
//     setShowSetTimer(false);
//   };

//   const handleEnd = () => {
//     if (studyActive) setTimeout(() => alert("Study time over!"), 1000);
//     else setTimeout(() => alert("Break time over!"), 1000);
//     //timeout needed to make sure text can rerender first, kinda hacky but whatever
//     setStudyActive(!studyActive);
//   };

//   return (
//     <div className="App">
//       <ImageUpload />
//       <TodoLists />
//       <p>Rain</p>
//       <AsmrSlider chosenNoise={Noise.Rain} />
//       <p>Traffic</p>
//       <AsmrSlider chosenNoise={Noise.Traffic} />
//       <p>River</p>
//       <AsmrSlider chosenNoise={Noise.River} />
//       <p>Boom Boom Pow </p>
//       <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
//       <Timer
//         time={studyActive ? currentStudy : currentBreak}
//         onClick={() => setShowSetTimer(!showSetTimer)}
//         onEnd={handleEnd}
//       />
//       {showSetTimer ? <SetTimer handleSubmit={handleSubmit} /> : null}
//     </div>
//   );
// }

export default App;
