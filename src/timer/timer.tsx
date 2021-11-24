import { useState, useEffect } from 'react';
interface timerProps {
    time: number[],
    onClick: () => void,
    onEnd: () => void
}

export default function Timer(props:timerProps): JSX.Element {
    const [[hrs, mins], setTime] = useState([props.time[0],props.time[1]]);
    const [alerting,setAlerting] = useState(false);

    const tick = () => {
        if ( hrs > 0 && mins === 0) {
            setTime([hrs - 1, 59]);
        } else if (mins > 0){
            setTime([hrs, mins - 1]);
        }
    };
    
    //check when chosen time changes
    useEffect(() => {
        setTime([props.time[0],props.time[1]]);
        setAlerting(false);
    },[props.time]);

    //change time
    useEffect(() => {
            const timerId = setInterval(() => tick(), 60000);
            return () => clearInterval(timerId);
    });

    //check when time runs out
    useEffect(() => {
        if (hrs === 0 && mins === 0 && !alerting)  {
            props.onEnd();
            setAlerting(true);
        }
    },[hrs,mins,props,alerting]);

    return (
        <button onClick={props.onClick}>
            {`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`}
        </button>
    );
}