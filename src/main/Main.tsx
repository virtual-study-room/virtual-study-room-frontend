import { useState, useContext, useEffect } from "react";
import "./Main.css";
import "../styles/App.css";
import { AsmrSlider, Noise } from "../asmrSlider/asmrSlider";
import Timer from "../timer/timer";
import ImageUpload from "../ImageUpload/ImageUpload";
import Sky from "../sky/Sky";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { TimerContext } from "../timer/TimerContext";
//import base from '../assets/t.jpg';

function Main() {
  const { logout } = useContext(AuthContext);
  const { studyActive, currentBreak, currentStudy } = useContext(TimerContext);
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
      <div className="App" style={{ backgroundColor: color() }}>
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

        <Timer time={studyActive ? currentStudy : currentBreak} />
      </div>
    </div>
  );
}

export default Main;
