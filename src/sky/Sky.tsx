import { useState, useEffect, useContext } from "react";
import daysmall from "../assets/daysmall.jpg";
import daymed from "../assets/daymed.jpg";
import daybig from "../assets/daybig.jpg";
import sunsmall from "../assets/sunsmall.jpg";
import sunmed from "../assets/sunmed.jpg";
import sunbig from "../assets/sunbig.jpg";
import nightsmall from "../assets/nightsmall.jpg";
import nightmed from "../assets/nightmed.jpg";
import nightbig from "../assets/nightbig.jpg";

import "./sky.css";
import { AuthContext } from "../auth/AuthContext";

export default function Sky() {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const lastLogged = user?.login;

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
  if (!lastLogged) {
    console.error("internal error");
    return (
      <img
        id="base"
        src={daybig}
        alt="the color of the sky, which changes based on the hour"
      />
    );
  }
  var days =
    (date.getTime() - new Date(lastLogged).getTime()) / (1000 * 3600 * 24);

  const image = () => {
    console.log(days);
    if (hour >= 19 || hour <= 4) {
      if (days < 2) return nightbig;
      else if (days < 5) return nightmed;
      return nightsmall;
    }
    if (hour >= 5 && hour <= 6) {
      if (days < 2) return sunbig;
      else if (days < 5) return sunmed;
      return sunsmall;
    }
    if (hour >= 7 && hour <= 16) {
      if (days < 2) return daybig;
      else if (days < 5) return daymed;
      return daysmall;
    } else {
      if (days < 2) return sunbig;
      else if (days < 5) return sunmed;
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
