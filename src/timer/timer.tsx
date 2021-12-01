import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "./setTimer.css";
import { TimerContext } from "./TimerContext";

interface timerProps {
  time: number[];
}

export default function Timer(props: timerProps): JSX.Element {
  const { handleEnd } = useContext(TimerContext);

  const [[hrs, mins], setTime] = useState<[number, number]>([0, -1]);
  const [alerting, setAlerting] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem(user?.username + " hours") !== null) {
      console.log("mount");
      const newHrs = parseInt(
        localStorage.getItem(user?.username + " hours") ?? "0"
      );
      const newMins = parseInt(
        localStorage.getItem(user?.username + " mins") ?? "-1"
      );
      setTime([newHrs, newMins]);
      console.log([newHrs, newMins]);
    } else {
      setAlerting(false);
      setTime([props.time[0], props.time[1]]);
    }
  }, [user, props.time]); //only when mounted or user changes

  const tick = () => {
    console.log("ticktick");
    console.log(`Hours: ${hrs}, Mins: ${mins}`);
    //set new time in local storage
    if (hrs > 0 && mins === 0) {
      setTime(([hrs, mins]) => [hrs - 1, 59]);
      localStorage.setItem(user?.username + " hours", (hrs - 1).toString());
      console.log("set local storage hours to: " + (hrs - 1));
      localStorage.setItem(user?.username + " mins", "59");
    } else if (mins > 0) {
      //console.log("entered yuh");
      setTime(([hrs, mins]) => [hrs, mins - 1]);
      localStorage.setItem(user?.username + " hours", hrs.toString());
      localStorage.setItem(user?.username + " mins", (mins - 1).toString());
    }
  };

  //check when chosen time changes
  // useEffect(() => {
  //   if (localStorage.getItem(user?.username + " hours") === null) {
  //       setAlerting(false)
  //       setTime([props.time[0], props.time[1]]);
  //   }
  // }, [props.time,user]);

  //change time
  useEffect(() => {
    console.log("Started ticking!");
    const timerId = setInterval(() => tick(), 60000);
    return () => clearInterval(timerId);
    // eslint-disable-next-line
  }, [hrs, mins]);

  //check when time runs out
  useEffect(() => {
    if (hrs === 0 && mins === 0 && !alerting) {
      handleEnd();
      setAlerting(true);
    }
    // eslint-disable-next-line
  }, [hrs, mins, props, alerting]);

  return (
    <Link className="timer" to="/timer">
      {`${hrs.toString().padStart(2, "0")}:${
        mins === -1 ? "00" : mins.toString().padStart(2, "0")
      }`}
    </Link>
  );
}
