import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

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
    <div>
      <div>
        <div>Select A Username: </div>
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
      </div>
      <div>
        <div>Select A Password:</div>
        <input
          type="password"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
        />
      </div>
      <div>
        <div>Verify Password:</div>
        <input
          type="password"
          value={verifyPasswordInput}
          onChange={(event) => setVerifyPasswordInput(event.target.value)}
        />
      </div>
      <button onClick={() => attemptSignUp()}>Sign Up</button>
      <Link to="/">Log In</Link>
    </div>
  );
}
