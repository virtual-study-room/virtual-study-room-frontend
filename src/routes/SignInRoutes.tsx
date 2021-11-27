import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/register";

export default function SignInRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
