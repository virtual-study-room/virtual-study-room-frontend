import { useState } from 'react';
import './App.css';
import { AsmrSlider, Noise } from './asmrSlider';
import SetTimer from './setTimer';
import Timer from './timer';

function App() {
  let [showSetTimer,setShowSetTimer] = useState(false);
  let [studyActive,setStudyActive] = useState(true);
  let [currentStudy,setCurrentStudy] = useState([0,10]); 
  let [currentBreak,setCurrentBreak] = useState([0,10]);  

  const handleSubmit = (studyTime:[number,number],breakTime:[number,number]) => {
    setCurrentStudy(studyTime);
    setCurrentBreak(breakTime);
    setShowSetTimer(false);
  }

  const handleEnd = () => {
    if (studyActive) setTimeout(() => alert("Study time over!"), 1000);
    else setTimeout(() => alert("Break time over!"), 1000);
    //timeout needed to make sure text can rerender first, kinda hacky but whatever
    setStudyActive(!studyActive);
  };

  return (
    <div className="App">
      <p>Rain</p>
      <AsmrSlider chosenNoise={Noise.Rain}/>
      <p>Traffic</p>
      <AsmrSlider chosenNoise={Noise.Traffic}/>
      <p>River</p>
      <AsmrSlider chosenNoise={Noise.River} />
      <p>Boom Boom Pow </p>
      <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
      <Timer 
        time={studyActive ? currentStudy:currentBreak} 
        onClick={() => setShowSetTimer(!showSetTimer)} 
        onEnd={handleEnd} 
      />
      {showSetTimer ? <SetTimer handleSubmit={handleSubmit}/> : null}
    </div>
  );
}

export default App;
