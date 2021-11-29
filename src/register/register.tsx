import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import "../login/Login.css"
import "../styles/App.css"

export default function Register() {
  const { attemptRegister } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [verifyPasswordInput, setVerifyPasswordInput] = useState("");
  const navigate = useNavigate();
  async function attemptSignUp() {
    if (passwordInput !== verifyPasswordInput) {
      alert("Passwords don't match.");
      return;
    }
    const status = await attemptRegister(userInput, passwordInput);
    if (status) {
      navigate("/");
    }
  }
  return (
    <div className="login">
    <div className="login-container">
      <div>
        <div className="login-text">Select A Username: </div>
        <input className="input"
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
      </div>
      <div>
        <div className="login-text">Select A Password:</div>
        <input className="input"
          type="password"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
        />
      </div>
      <div>
        <div className="login-text">Verify Password:</div>
        <input className="input"
          type="password"
          value={verifyPasswordInput}
          onChange={(event) => setVerifyPasswordInput(event.target.value)}
        />
      </div>
      <button className="button action" onClick={() => attemptSignUp()}>Sign Up</button>
      <Link className="button" to="/">Log In</Link>
    </div>
    </div>
  );
}
