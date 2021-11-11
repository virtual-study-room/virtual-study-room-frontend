import './App.css';
import { AsmrSlider, Noise } from './asmrSlider';

function App() {
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
    </div>
  );
}

export default App;
