import React, { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../App";
export interface UserProfile {
  username: string;
  bio?: string;
  phone?: string;
  login?: Date;
}

interface UserProfileResponse {
  user: UserProfile;
}

interface LoginResponse {
  token: string;
  prevLogin: Date;
}

interface AuthInfo {
  user: UserProfile | null;
  authToken: string;
  isValidToken: boolean;
  attemptLogin: (username: string, password: string) => void;
  attemptRegister: (
    username: string,
    password: string,
    phone?: string
  ) => Promise<boolean>;
  logout: () => void;
}

interface RegisterInfo {
  username: string;
  password: string;
  phone?: string;
}

interface AuthWrapperProps {
  children: JSX.Element;
}

interface TokenValidationResponse {
  username: string;
  prevLogin: Date;
}

const defaultAuthContext: AuthInfo = {
  user: null,
  authToken: "",
  isValidToken: false,
  attemptLogin: (username: string, password: string) => {},
  attemptRegister: (username: string, password: string, phone?: string) => {
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
      //exit and warmup serverif no localToken
      if (!storageToken) {
        console.log("No saved token");
        warmupServer();
        return;
      }

      //validate token if possible
      const validatedUser = await validateToken(storageToken);
      //set valid token to true i
      //TODO: Add in phone functionality
      if (validatedUser) {
        const username = validatedUser.username;
        const userProfile = await getUserProfile(username, storageToken);
        if (!userProfile) {
          console.error("Error getting user info!");
          return;
        }
        //modify user's profile login to the prev login info
        console.log(validatedUser);
        const lastLoggedIn = validatedUser.login;
        userProfile.login = lastLoggedIn;
        console.log("Making user's last logged in: " + lastLoggedIn);
        setUser(userProfile);
        setIsValidToken(true);
      } else {
        setUser(null);
        setIsValidToken(false);
      }
    }
    attemptLocalLogin();

    //only fire when first mounted
  }, []);

  //helper function to attempt signing in
  async function attemptLogin(username: string, password: string) {
    //console.log("Running!");
    localStorage.removeItem(user?.username + " studyTime");
    localStorage.removeItem(user?.username + " breakTime");
    const validLoginResponse = await attemptServerLogin(username, password);
    //TODO: Add in phone functionality
    if (!validLoginResponse) {
      alert("Invalid username/password");
    } else {
      const token = validLoginResponse.token;
      const prevLogin = validLoginResponse.prevLogin;
      const userProfile = await getUserProfile(username, token);
      if (!userProfile) {
        console.log("Error getting user info!");
        return;
      } else {
        //override the userProfile to the prev login's value
        userProfile.login = prevLogin;
        console.log("Making prev login: " + prevLogin);
        setUser(userProfile);
        setAuthToken(token);
        localStorage.setItem("auth-token", token);
        setIsValidToken(true);
      }
    }
  }

  async function attemptRegister(
    username: string,
    password: string,
    phone?: string
  ) {
    const reqBody: RegisterInfo = {
      username: username,
      password: password,
    };
    //
    if (phone) {
      reqBody.phone = phone;
    }
    const registerResponse = await fetch(
      process.env.REACT_APP_SERVER_BASE_URL + "/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );
    if (registerResponse.status === 401) {
      alert("Invalid phone number.");
      return false;
    } else if (registerResponse.status !== 200) {
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
    setUser(null);
    setIsValidToken(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        user,
        isValidToken,
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
  //console.log(account);
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
  const loginResData: LoginResponse = await loginRes.json();
  return loginResData;
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
  return {
    username: tokenData.username,
    login: tokenData.prevLogin,
  };
}

async function getUserProfile(username: string, authToken: string) {
  const userInfoRes = await fetch(SERVER_BASE_URL + "/getInfo", {
    method: "GET",
    headers: {
      authorization: "Bearer " + authToken,
    },
  });
  if (userInfoRes.status !== 200) {
    console.log("Error getting profile");
    return null;
  } else {
    const userProfileRes: UserProfileResponse = await userInfoRes.json();
    const userProfile = userProfileRes.user;
    //return userProfile if exists
    return userProfile;
  }
}

function warmupServer() {
  console.log("Warming up server!");
  fetch(SERVER_BASE_URL + "/");
}
