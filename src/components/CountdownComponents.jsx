import React, { useMemo, useRef, useState, memo, useCallback } from "react";
import Button from "./Button";
import LinearProgress from "@mui/material/LinearProgress";
import useSound from "use-sound";
import sova from "./sova.mp3";
import styled from "styled-components";
import TimePickerViews from "./TimePickerViews";
const StileHead = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
function CountdownComponents() {
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const intervalId = useRef();
  const [play] = useSound(sova);

  const start = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      return;
    }
    if (timer === 0) {
      return;
    }
    intervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 1) {
          clearInterval(intervalId.current);
          intervalId.current = null;
          play();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1);
  }, [timer]);
  const Reset = useCallback(() => {
    stop();
    setTimer(startTime);
  }, [startTime]);
  const stop = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    
  }, []);
  const time = useMemo(() => {
    const ostatok = timer % (60 * 60);
    const hoursTime = (timer - ostatok) / (60 * 60);
    const secondsTime = ostatok % 60;
    const minutesTime = (ostatok - secondsTime) / 60;
    const progress =
      ((secondsTime + minutesTime * 60 + hoursTime * 60 * 60) / startTime) *
      100;
    const itog =
      (hoursTime < 10 ? "0" + hoursTime : hoursTime) +
      ":" +
      (minutesTime < 10
        ? "0" + minutesTime
        : minutesTime) +
      ":" +
      (secondsTime < 10
        ? "0" + secondsTime
        : secondsTime);
    return {
      itog,
      progress,
    };
  }, [timer, startTime]);

  return (
    <div className="timerH3">
      <h1>Countdown</h1>
      <StileHead>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {time.itog}
        </div>
        <LinearProgress variant="determinate" value={time.progress} />
      </StileHead>
      <Button
        variant="contained"
        color="success"
        metod={() => {
          start();
        }}
        text="Старт"
      />
      <Button
        variant="outlined"
        metod={() => {
          stop();
        }}
        text="Стоп"
      />
      <Button variant="outlined" color="error" metod={Reset} text="Сброс" />
      <TimePickerViews
        sabaka={(time) => {
          setStartTime(time);
          setTimer(time);
        }}
      />
    </div>
  );
}

export default memo(CountdownComponents);
