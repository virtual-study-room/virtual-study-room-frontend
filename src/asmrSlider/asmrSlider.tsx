import ReactSlider from "react-slider";
import "./asmrSlider.css";
import Rain from "../assets/rain.wav";
import Traffic from "../assets/traffic.mp3";
import River from "../assets/river.wav";
import BoomBoomPow from "../assets/BoomBoomPow.mp3";
import { useState } from "react";

export enum Noise {
  Rain = "RAIN",
  Traffic = "TRAFFIC",
  River = "RIVER",
  BoomBoomPow = "BOOMBOOMPOW",
}

interface asmrSliderProps {
  chosenNoise: Noise;
}

export function AsmrSlider(props: asmrSliderProps): JSX.Element {
  const [audio] = useState(new Audio());
  audio.loop = true;
  switch (props.chosenNoise) {
    case Noise.Rain:
      audio.src = Rain;
      break;
    case Noise.Traffic:
      audio.src = Traffic;
      break;
    case Noise.River:
      audio.src = River;
      break;
    case Noise.BoomBoomPow:
      audio.src = BoomBoomPow;
      break;
  }

  const onChange = (e: number) => {
    audio.play();
    audio.volume = e / 100;
  };

  return (
    <ReactSlider
      className="slider"
      thumbClassName="thumb"
      trackClassName="track"
      onChange={onChange}
    />
  );
}
