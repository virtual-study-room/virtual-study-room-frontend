import './styles/App.css';
import base from './assets/t.jpg';
import React from "react";
import { AsmrSlider, Noise } from "./asmrSlider/asmrSlider";
import TodoLists from "./TodoList/TodoLists";

function App() {

  return (
    <div className="App">
      {/* <img id="base" src={base}></img>
      <div className="asmr-sliders">
        <div>Rain</div>
        <AsmrSlider chosenNoise={Noise.Rain}/>
        <div>Traffic</div>
        <AsmrSlider chosenNoise={Noise.Traffic}/>
        <div>River</div>
        <AsmrSlider chosenNoise={Noise.River} />
        <div>Music</div>
        <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
      </div> */}
      <div className="todo-wrapper">
        <TodoLists/>
      </div>
      
    </div>
  );
}

export default App;
