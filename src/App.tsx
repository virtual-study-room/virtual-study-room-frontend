import React from "react";
import { AsmrSlider, Noise } from "./asmrSlider/asmrSlider";
import TodoLists from "./TodoList/TodoLists";
import ImageUpload from "./ImageUpload/ImageUpload";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ImageUpload />
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
