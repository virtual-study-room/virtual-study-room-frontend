import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
export default function LoginPage() {
  const { attemptLogin, authToken } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div>
      <div>
        <div>Username: </div>
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
      </div>
      <div>
        <div>Password:</div>
        <input
          type="password"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
        />
      </div>
      <button onClick={() => attemptLogin(userInput, passwordInput)}>
        Log In
      </button>
    </div>
  );
}
