import { useState } from "react";
import "./setTimer.css";
import { Link } from "react-router-dom";

interface setTimerProps {
  handleSubmit: (
    studyTime: [number, number],
    breakTime: [number, number]
  ) => void;
}

export default function SetTimer(props: setTimerProps): JSX.Element {
  let [[studyHrs, studyMins], setNewStudy] = useState([0, 5]);
  let [[breakHrs, breakMins], setNewBreak] = useState([0, 5]);

  const handleClick = (isStudy: boolean, increment: boolean) => {
    if (!increment && studyMins === 5 && studyHrs === 0) return; //can't go lower than 5 minutes
    if (isStudy) {
      if (increment) {
        if (studyMins === 55) setNewStudy([studyHrs + 1, 0]);
        else setNewStudy([studyHrs, studyMins + 5]);
      } else {
        if (studyMins === 0) setNewStudy([studyHrs - 1, 55]);
        else setNewStudy([studyHrs, studyMins - 5]);
      }
    } else {
      if (increment) {
        if (breakMins === 55) setNewBreak([breakHrs + 1, 0]);
        else setNewBreak([breakHrs, breakMins + 5]);
      } else {
        if (breakMins === 0) setNewBreak([breakHrs - 1, 55]);
        else setNewBreak([breakHrs, breakMins - 5]);
      }
    }
  };

  return (
    <div className="timer-container">
      <Link to="/" className="exit">
        ◀
      </Link>
      <div className="setTimer">
        <div className="row">
          <div className="timer-title">study</div>
          <div className="time">
            {`${studyHrs.toString().padStart(2, "0")} hrs ${studyMins
              .toString()
              .padStart(2, "0")} mins`}
          </div>
          <div className="adjust">
            <button
              className="adjustButton"
              onClick={() => handleClick(true, true)}
            >
              +
            </button>
            <button
              className="adjustButton action"
              onClick={() => handleClick(true, false)}
            >
              -
            </button>
          </div>
        </div>
        <div className="row">
          <div className="timer-title">break</div>
          <div className="time">
            {`${breakHrs.toString().padStart(2, "0")} hrs ${breakMins
              .toString()
              .padStart(2, "0")} mins`}
          </div>
          <div className="adjust">
            <button
              className="adjustButton"
              onClick={() => handleClick(false, true)}
            >
              +
            </button>
            <button
              className="adjustButton action"
              onClick={() => handleClick(false, false)}
            >
              -
            </button>
          </div>
        </div>
        <Link
          className="button timer-btn"
          to="/"
          onClick={() =>
            props.handleSubmit([studyHrs, studyMins], [breakHrs, breakMins])
          }
        >
          START
        </Link>
      </div>
    </div>
  );
}
