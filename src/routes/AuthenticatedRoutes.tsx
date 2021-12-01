import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import TodoLists from "../TodoList/TodoLists";
import Login from "../login/Login";
import SetTimer from "../timer/setTimer";
import { TimerProvider } from "../timer/TimerContext";

export default function AuthenticatedRoute() {
  return (
    <TimerProvider>
      <TimedContent />
    </TimerProvider>
  );
}

function TimedContent() {
  const [images, setImages] = useState(Array(9).fill(null));
  const [imagesState, setImagesState] = useState(Array(9).fill(false)); // false if there is no image, true if there is

  const { isValidToken } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              images={images}
              setImages={setImages}
              imagesState={imagesState}
              setImagesState={setImagesState}
            />
          }
        />
        <Route path="/todo" element={<TodoLists />} />
        <Route path="/timer" element={<SetTimer />} />
        {/* Default: Main if logged in, or login if not logged in */}
        <Route
          path="*"
          element={
            isValidToken ? (
              <Main
                images={images}
                setImages={setImages}
                imagesState={imagesState}
                setImagesState={setImagesState}
              />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
