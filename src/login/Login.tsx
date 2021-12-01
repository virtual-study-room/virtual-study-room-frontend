import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import React, { useContext, useState } from "react";
import "./Login.css";
import "../styles/App.css";

export default function Login() {
  const { attemptLogin } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div className="login">
      <div className="login-container">
        <div>
          <div className="login-text">username: </div>
          <input
            className="input"
            type="text"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
        </div>
        <div>
          <div className="login-text">password:</div>
          <input
            className="input"
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") attemptLogin(userInput, passwordInput);
            }}
          />
        </div>
        <button
          className="button"
          onClick={() => attemptLogin(userInput, passwordInput)}
        >
          Log In
        </button>
        <Link className="button action" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
