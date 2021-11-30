import React, { useContext, useState } from "react";
import { SERVER_BASE_URL } from "../App";
import { AuthContext } from "../auth/AuthContext";
interface TimerInfo {
  handleRestore: (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => void;
  handleSubmit: (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => void;
  handleEnd: () => void;
  studyActive: boolean;
  currentStudy: [number, number];
  currentBreak: [number, number];
}

interface TimerWrapperProps {
  children: JSX.Element;
}

const defaultTimerContext: TimerInfo = {
  handleRestore: (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => {},
  handleSubmit: (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => {},
  handleEnd: () => {},
  studyActive: true,
  currentStudy: [0, -1],
  currentBreak: [0, -1],
};

export const TimerContext = React.createContext(defaultTimerContext);

export function TimerProvider({ children }: TimerWrapperProps) {
  const { user, authToken } = useContext(AuthContext);
  const [currentStudy, setCurrentStudy] = useState<[number, number]>([0, -1]);
  const [currentBreak, setCurrentBreak] = useState<[number, number]>([0, -1]);
  const [studyActive, setStudyActive] = useState(true);

  //helper functions
  const handleRestore = async (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => {
    setCurrentStudy(studyTime);
    setCurrentBreak(breakTime);
  };

  const handleSubmit = async (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => {
    if (user?.phone) {
      const studyTimeLength = studyTime[0] * 60 + studyTime[1];
      await sendStartStudyMsg(authToken, studyTimeLength);
    }
    localStorage.removeItem(user?.username + " hours");
    localStorage.removeItem(user?.username + " mins");
    setCurrentStudy(studyTime);
    setCurrentBreak(breakTime);
    localStorage.setItem(user?.username + " breakTime",breakTime.join(","));
    localStorage.setItem(user?.username + " studyTime",studyTime.join(","));
  };

  const handleEnd = () => {
    localStorage.removeItem(user?.username + " hours");
    localStorage.removeItem(user?.username + " mins");
    if (studyActive) {
      setTimeout(() => {
        if (user?.phone) {
          const breakTimeLength = currentBreak[0] * 60 + currentBreak[1];
          sendStudyEndMsg(authToken, breakTimeLength);
        }
        alert("Study time over!");
      }, 1000);
    } else {
      setTimeout(() => {
        if (user?.phone) {
          const studyTimeLength = currentStudy[0] * 60 + currentStudy[1];
          sendBreakEndMsg(authToken, studyTimeLength);
        }
        alert("Break time over!");
      }, 1000);
    }
    //timeout needed to make sure text can rerender first, kinda hacky but whatever
    setStudyActive(!studyActive);
  };

  return (
    <TimerContext.Provider
      value={{
        handleRestore,
        handleEnd,
        handleSubmit,
        studyActive,
        currentStudy,
        currentBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export async function sendStartStudyMsg(authToken: string, length: number) {
  const sendMsgStatus = await fetch(SERVER_BASE_URL + "/setStudyTimer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      minutes: length,
    }),
  });
  if (sendMsgStatus.status !== 200) {
    console.error("Error sending finished study msg.");
  }
}

async function sendFinishedBreakMsg(authToken: string) {
  const sendMsgStatus = await fetch(SERVER_BASE_URL + "/completedBreakTime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
  });
  if (sendMsgStatus.status !== 200) {
    console.error("Error sending finished break msg.");
  }
}

async function sendFinishedStudyMsg(authToken: string) {
  const sendMsgStatus = await fetch(SERVER_BASE_URL + "/completedStudyTime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
  });
  if (sendMsgStatus.status !== 200) {
    console.error("Error sending finished study msg.");
  }
}

async function sendStartBreakMsg(authToken: string, length: number) {
  const sendMsgStatus = await fetch(SERVER_BASE_URL + "/setBreakTimer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      minutes: length,
    }),
  });
  if (sendMsgStatus.status !== 200) {
    console.error("Error sending finished break msg.");
  }
}

async function sendBreakEndMsg(authToken: string, studyTimeLength: number) {
  await sendFinishedBreakMsg(authToken);
  await sendStartStudyMsg(authToken, studyTimeLength);
}

async function sendStudyEndMsg(authToken: string, breakTimeLength: number) {
  await sendFinishedStudyMsg(authToken);
  await sendStartBreakMsg(authToken, breakTimeLength);
}
