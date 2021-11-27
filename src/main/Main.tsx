import { useState, useContext } from "react";
import "./Main.css";
import { AsmrSlider, Noise } from "../asmrSlider/asmrSlider";
import Timer from "../timer/timer";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

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
    <div className="Main">
      <ImageUpload />
      <p>Rain</p>
      <AsmrSlider chosenNoise={Noise.Rain} />
      <p>Traffic</p>
      <AsmrSlider chosenNoise={Noise.Traffic} />
      <p>River</p>
      <AsmrSlider chosenNoise={Noise.River} />
      <p>Boom Boom Pow </p>
      <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
      <Timer
        time={studyActive ? props.currentStudy : props.currentBreak}
        onEnd={handleEnd}
      />
      <br />
      <Link to="/todo">Todo lists</Link>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}

export default Main;
