import { useState, useContext } from "react";
import "./Main.css";
import "../styles/App.css";
import { AsmrSlider, Noise } from "../asmrSlider/asmrSlider";
import Timer from "../timer/timer";
import ImageUpload from "../ImageUpload/ImageUpload";
import Sky from "../sky/Sky";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import base from '../assets/t.jpg';


interface mainProps {
  currentStudy: number[];
  currentBreak: number[];
}

function Main(props: mainProps) {
  const { logout } = useContext(AuthContext);
  let [studyActive, setStudyActive] = useState(true);

  const handleEnd = () => {
    if (studyActive) setTimeout(() => alert("Study time over!"), 1000);
    else setTimeout(() => alert("Break time over!"), 1000);
    //timeout needed to make sure text can rerender first, kinda hacky but whatever
    setStudyActive(!studyActive);
  };

  return (
    <div className="App">
      <Sky />
      {/* <ImageUpload /> */}
      <Link className="todo-button" to="/todo"></Link>
      <button className="button action logout-button" onClick={() => logout()}>Logout</button>
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
  );
}

export default Main;
