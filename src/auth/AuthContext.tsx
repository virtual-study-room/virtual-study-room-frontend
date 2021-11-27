import React, { useEffect, useState } from "react";
export interface UserProfile {
  username: string;
  bio?: string;
}
interface AuthInfo {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  isValidToken: boolean;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
  attemptLogin: (username: string, password: string) => void;
  attemptRegister: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface AuthWrapperProps {
  children: JSX.Element;
}

interface TokenValidationResponse {
  username: string;
}

const defaultUser: UserProfile = {
  username: "",
  bio: "",
};

const defaultAuthContext: AuthInfo = {
  user: defaultUser,
  authToken: "",
  setUser: () => {},
  setAuthToken: () => {},
  isValidToken: false,
  setIsValidToken: () => {},
  attemptLogin: (username: string, password: string) => {},
  attemptRegister: (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  },
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContext);

export const AuthProvider = ({ children }: AuthWrapperProps) => {
  const [authToken, setAuthToken] = useState(
    String(localStorage.getItem("auth-token"))
  );
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  //grab the token from storage when app first mounts, attempting to login
  useEffect(() => {
    async function attemptLocalLogin() {
      const storageToken = localStorage.getItem("auth-token");
      if (!storageToken) return;
      console.log(storageToken);
      //exit if no localToken
      if (!storageToken) {
        console.log("No saved token");
        return;
      }

      //validate token if possible
      const validatedToken = await validateToken(storageToken);
      //set valid token to true i
      if (validatedToken) {
        setUser({
          username: validatedToken,
        });
        setIsValidToken(true);
      }
    }
    attemptLocalLogin();

    //only fire when first mounted
  }, []);

  //helper function to attempt signing in
  async function attemptLogin(username: string, password: string) {
    //console.log("Running!");
    const token = await attemptServerLogin(username, password);
    if (!token) {
      alert("Invalid username/password");
    } else {
      setAuthToken(token);
      localStorage.setItem("auth-token", token);
      setIsValidToken(true);
    }
  }

  async function attemptRegister(username: string, password: string) {
    const registerResponse = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL + "/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    if (registerResponse.status !== 200) {
      alert("Username already taken, please select another one!");
      return false;
    } else {
      alert("Successfully signed up!");
      return true;
    }
  }

  function logout() {
    localStorage.removeItem("auth-token");
    setAuthToken("");
    setIsValidToken(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        user,
        setUser,
        isValidToken,
        setIsValidToken,
        attemptLogin,
        attemptRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//function that returns token if logged in
async function attemptServerLogin(username: string, password: string) {
  const account = {
    username: username,
    password: password,
  };
  console.log(account);
  const loginRes = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  );

  //exit early if not successful, return empty string
  if (loginRes.status !== 200) {
    return "";
  }
  const loginResData = await loginRes.json();
  const userToken: string = loginResData.token;
  return userToken;
}

async function validateToken(authToken: string) {
  const tokenResponse = await fetch(
    process.env.REACT_APP_SERVER_BASE_URL + "/isValidToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authToken: authToken,
      }),
    }
  );

  //exit if invalid token
  if (tokenResponse.status !== 200) {
    return "";
  }
  const tokenData: TokenValidationResponse = await tokenResponse.json();
  return tokenData.username;
}
