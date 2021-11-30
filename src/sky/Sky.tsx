import { useState, useEffect } from "react";
import night from "../assets/night.jpg";
import sunrise from "../assets/sunrise.jpg";
import day from "../assets/t.jpg";

// import daysmall from "../assets/daysmall.jpg"
// import daymed from "../assets/daymed.jpg"
// import daybig from "../assets/daybig.jpg"
// import sunsmall from "../assets/sunsmall.jpg"
// import sunmed from "../assets/sunmed.jpg"
// import sunbig from "../assets/sunbig.jpg"
// import nightsmall from "../assets/nightsmall.jpg"
// import nightmed from "../assets/nightmed.jpg"
// import nightbig from "../assets/nightbig.jpg"

import "./sky.css";

export default function Sky() {
  const [date, setDate] = useState(new Date());
  const [lastLogged, setLastLogged] = useState(new Date());

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
  var days = date.getTime() - lastLogged.getTime() / (1000 * 3600 * 24);

  const image = () => {
    if (hour >= 19 || hour <= 4){
      if(days<2) return nightbig;
      else if (days<5) return nightmed;
      return nightsmall;
    } 
    if (hour >= 5 && hour <= 6) {
      if(days<2) return sunbig;
      else if (days<5) return sunmed;
      return sunsmall;
    }
    if (hour >= 7 && hour <= 16) {
      if(days<2) return daybig;
      else if (days<5) return daymed;
      return daysmall;
    }
    else {
      if(days<2) return sunbig;
      else if (days<5) return sunmed;
      return sunsmall;
    }
  };

  return (
    <img
      id="base"
      src={image()}
      alt="the color of the sky, which changes based on the hour"
    />
  );
}
