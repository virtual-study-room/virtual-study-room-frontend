import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Register() {
  const { attemptRegister } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [verifyPasswordInput, setVerifyPasswordInput] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [phoneField1, setPhoneField1] = useState("");
  const [phoneField2, setPhoneField2] = useState("");
  const [useNumber, setUseNumber] = useState(false);

  const navigate = useNavigate();
  async function attemptSignUp() {
    if (passwordInput !== verifyPasswordInput) {
      alert("Passwords don't match.");
      return;
    }

    //signup without phone if don't want to use number
    if (!useNumber) {
      const status = await attemptRegister(userInput, passwordInput);
      if (status) {
        navigate("/");
      }
    }
    //else signup with phone
    else {
      const formattedNumber = formatNumber(
        countryCode,
        areaCode,
        phoneField1,
        phoneField2
      );
      //exit if not formatted
      if (!formattedNumber) {
        return;
      }
      //console.log(formattedNumber);
      const status = await attemptRegister(
        userInput,
        passwordInput,
        formattedNumber
      );
      if (status) {
        navigate("/");
      }
    }
  }

  function handleCountryCodeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (validateNumInput(1, event.target.value))
      setCountryCode(event.target.value);
  }

  function handleAreaCodeInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (validateNumInput(3, event.target.value))
      setAreaCode(event.target.value);
  }
  function handlePhoneField1Input(event: React.ChangeEvent<HTMLInputElement>) {
    if (validateNumInput(3, event.target.value))
      setPhoneField1(event.target.value);
  }
  function handlePhoneField2Input(event: React.ChangeEvent<HTMLInputElement>) {
    if (validateNumInput(4, event.target.value))
      setPhoneField2(event.target.value);
  }

  function displayPhoneNumberInput() {
    return (
      <div>
        <div>Phone Number for Notifications:</div>
        <span>+</span>
        <input
          type="text"
          value={countryCode}
          placeholder="#"
          onChange={handleCountryCodeInput}
        />
        <span>(</span>
        <input
          type="text"
          value={areaCode}
          placeholder="###"
          onChange={handleAreaCodeInput}
        />
        <span>)</span>
        <input
          type="text"
          value={phoneField1}
          placeholder="###"
          onChange={handlePhoneField1Input}
        />
        <span>-</span>
        <input
          type="text"
          value={phoneField2}
          placeholder="####"
          onChange={handlePhoneField2Input}
        />
      </div>
    );
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

      <div>
        Signup for Text Notifications
        <input
          type="checkbox"
          checked={useNumber}
          onChange={() => setUseNumber(!useNumber)}
        />
      </div>
      {useNumber && displayPhoneNumberInput()}
      <button onClick={() => attemptSignUp()}>Sign Up</button>
      <Link to="/">Log In</Link>
    </div>
  );
}

function validateNumInput(length: number, input: string) {
  //return false if already length chars
  if (input.length > length) return false;
  const chars = input.split("");
  //return false if not all integers
  for (const char of chars) {
    if (!Number.isInteger(Number(char))) return false;
  }
  return true;
}

function formatNumber(
  countryCode: string,
  areaCode: string,
  phoneField1: string,
  phoneField2: string
) {
  //handle invalid input
  if (
    countryCode.length !== 1 &&
    areaCode.length !== 3 &&
    phoneField1.length !== 3 &&
    phoneField2.length !== 4
  ) {
    alert("Must format phone number properly!");
    return "";
  }
  return "+" + countryCode + areaCode + phoneField1 + phoneField2;
}
