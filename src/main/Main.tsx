import { useState, useContext, useEffect } from "react";
import "./Main.css";
import "../styles/App.css";
import { AsmrSlider, Noise } from "../asmrSlider/asmrSlider";
import Timer from "../timer/timer";
import ImageUpload from "../ImageUpload/ImageUpload";
import Sky from "../sky/Sky";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { SERVER_BASE_URL } from "../App";
//import base from '../assets/t.jpg';

interface mainProps {
  currentStudy: number[];
  currentBreak: number[];
}

function Main(props: mainProps) {
  const { logout, authToken, user } = useContext(AuthContext);
  let [studyActive, setStudyActive] = useState(true);

  // useEffect(() => {
  //   //do nothing if timer hasn't started yet
  //   if (
  //     props.currentStudy[0] === 0 &&
  //     props.currentStudy[1] === -1 &&
  //     props.currentBreak[0] === 0 &&
  //     props.currentStudy[1] === -1
  //   )
  //     return;
  //     if(studyActive){
  //       sendStartBreakMsg(authToken, )
  //     }
  // }, [studyActive, props.currentStudy, props.currentBreak]);
  const handleEnd = () => {
    if (studyActive) {
      setTimeout(async () => {
        if (user?.phone) {
          const breakTimeLength =
            props.currentBreak[0] * 60 + props.currentBreak[1];
          await sendFinishedStudyMsg(authToken);
          await sendStartBreakMsg(authToken, breakTimeLength);
        }
        alert("Study time over!");
      }, 1000);
    } else {
      setTimeout(async () => {
        if (user?.phone) {
          const studyTimeLength =
            props.currentStudy[0] * 60 + props.currentStudy[1];
          await sendFinishedStudyMsg(authToken);
          await sendStartStudyMsg(authToken, studyTimeLength);
          await sendFinishedBreakMsg(authToken);
        }
        alert("Break time over!");
      }, 1000);
    }
    //timeout needed to make sure text can rerender first, kinda hacky but whatever
    setStudyActive(!studyActive);
  };

  // date stuff
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // update the current date every 15 seconds
      setDate(new Date());
    }, 15 * 1000);
    return () => {
      clearInterval(timer); // clear the timer so that it will stop being called on unmount
    };
  }, []);

  const hour = date.getHours();

  const color = () => {
    if (hour >= 19 || hour <= 4) return "#90A5C2";
    if (hour >= 5 && hour <= 6) return "#E59766";
    if (hour >= 7 && hour <= 16) return "#C1C7A3";
    return "#E59766";
  };

  return (
    <div>
      <ImageUpload />
      <div className="App"
        style={{backgroundColor: color()}}
      >
        <Sky />

        <Link className="todo-button" to="/todo"></Link>
        <button
          className="button action logout-button"
          onClick={() => logout()}
        >
          Logout
        </button>
        <div className="asmr-sliders">
          <div>Rain</div>
          <AsmrSlider chosenNoise={Noise.Rain} />
          <div>Traffic</div>
          <AsmrSlider chosenNoise={Noise.Traffic} />
          <div>River</div>
          <AsmrSlider chosenNoise={Noise.River} />
          <div>Music </div>
          <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
        </div>

        <Timer
          time={studyActive ? props.currentStudy : props.currentBreak}
          onEnd={handleEnd}
        />
      </div>
    </div>
  );
}

export default Main;

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
