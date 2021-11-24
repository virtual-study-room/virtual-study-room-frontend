import React from "react";
import { AsmrSlider, Noise } from "./asmrSlider";
import TodoLists from "./TodoList/TodoLists.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoLists />
      <div>
        <p>Rain</p>
        <AsmrSlider chosenNoise={Noise.Rain} />
        <p>Traffic</p>
        <AsmrSlider chosenNoise={Noise.Traffic} />
        <p>River</p>
        <AsmrSlider chosenNoise={Noise.River} />
        <p>Boom Boom Pow </p>
        <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
      </div>
    </div>
  );
}

export default App;
