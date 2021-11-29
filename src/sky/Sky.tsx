import { useState, useEffect } from "react";
import night from "../assets/night.jpg";
import sunrise from "../assets/sunrise.jpg";
import day from "../assets/t.jpg";
import "./sky.css"

export default function Sky() {
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

  const image = () => {
    if (hour >= 19 || hour <= 4) return night;
    if (hour >= 5 && hour <= 6) return sunrise;
    if (hour >= 7 && hour <= 16) return day;
    return sunrise;
  };

  return (
    <img
      id="base"
      src={image()}
      alt="the color of the sky, which changes based on the hour"
    />
  );
}
