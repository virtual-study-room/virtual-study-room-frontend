import './styles/App.css';
import { AsmrSlider, Noise } from './asmrSlider';
import base from './assets/t.jpg';

function App() {

  return (
    <div className="App">
      <img id="base" src={base}></img>
      <div className="asmr-sliders">
        <div>Rain</div>
        <AsmrSlider chosenNoise={Noise.Rain}/>
        <div>Traffic</div>
        <AsmrSlider chosenNoise={Noise.Traffic}/>
        <div>River</div>
        <AsmrSlider chosenNoise={Noise.River} />
        <div>Music</div>
        <AsmrSlider chosenNoise={Noise.BoomBoomPow} />
      </div>
      
    </div>
  );
}

export default App;
