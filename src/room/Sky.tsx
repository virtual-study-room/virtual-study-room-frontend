import { useState, useEffect } from "react";
import night from "../assets/sky-night.png";
import sunrise from "../assets/sky-sunrise.png";
import day from "../assets/sky-day.png";
import sunset from "../assets/sky-sunset.png";

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
    return sunset;
  };

  return <img src={image()} width="50px" height="50px" />;
}
