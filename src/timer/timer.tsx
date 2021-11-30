import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./setTimer.css";
import { TimerContext } from "./TimerContext";

interface timerProps {
  time: number[];
}

export default function Timer(props: timerProps): JSX.Element {
  const { handleEnd } = useContext(TimerContext);
  const [[hrs, mins], setTime] = useState<[number, number]>([
    props.time[0],
    props.time[1],
  ]);
  const [alerting, setAlerting] = useState(false);

  const tick = () => {
    console.log("ticktick");
    console.log(`Hours: ${hrs}, Mins: ${mins}`);
    if (hrs > 0 && mins === 0) {
      setTime(([hrs, mins]) => [hrs - 1, 59]);
    } else if (mins > 0) {
      //console.log("entered yuh");
      setTime(([hrs, mins]) => [hrs, mins - 1]);
    }
  };

  //check when chosen time changes
  useEffect(() => {
    setTime([props.time[0], props.time[1]]);
    setAlerting(false);
  }, [props.time]);

  //change time
  useEffect(() => {
    console.log("Started ticking!");
    const timerId = setInterval(() => tick(), 6000);
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
