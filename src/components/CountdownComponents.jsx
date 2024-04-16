import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import Button from "./btn";
import LinearProgress from "@mui/material/LinearProgress";
import useSound from 'use-sound';
import sova from "./sova.mp3"
import styled from "styled-components";
function CountdownComponents(props) {
  const [timer, setTimer] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const IntervalId = useRef();
  const[play] = useSound(sova)
  useEffect(() => {
    setTimer(props.time);
    setMinutes(props.seconds);
    setSeconds(props.minutes);
  }, [props.time, props.minutes, props.seconds]);
 
  const Start= useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
      return;
    }
    IntervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          setSeconds((prevSeconds) => {
            if (prevSeconds <= 0) {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
            return prevSeconds - 1;
          });
          return 59;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    
  },[]);
  if (timer === 1 && minutes <= 0 && seconds <= 0) {
    play()
  }
  if (timer <= 0 && minutes <= 0 && seconds <= 0) {
    
    clearInterval(IntervalId.current);
    IntervalId.current = null;
  }
  const Stop = useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
    }
  },[]);
const StileHead =styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
  return (
    <div className="timerH3">
    <h1 >Countdown</h1>
      <StileHead>
        <div style={{display:"flex",
      justifyContent:"center"}}>
        {minutes <= 0 ? "00" : minutes < 10 ? "0" + minutes : minutes}:
        {seconds <= 0 ? "00" : seconds < 10 ? "0" + seconds : seconds}:
        {timer <= 0 ? "00" : timer < 10 ? "0" + timer : timer}
        </div><LinearProgress
          variant="determinate"
          value={
            ((minutes * 3600 + seconds * 60 + timer) /
              (props.seconds * 3600 + props.minutes * 60 + props.time)) *
              100 || 0
          }
        />
        </StileHead>
         <Button
        variant="contained"
        color="success"
        metod={() => {
          Start();
        }}
        text="Старт"
      />
      <Button
        variant="outlined"
        metod={() => {
          Stop();
        }}
        text="Стоп"
      />
      <Button
        variant="outlined"
        color="error"
        metod={() => {
          setSeconds(0);
          setMinutes(0);
          setTimer(0);
        }}
        text="Сброс"
      />
      
   </div>  
    
  );
}

export default memo (CountdownComponents);
