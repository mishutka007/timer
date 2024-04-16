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

  const IntervalId = useRef();
  const [play] = useSound(sova);

  const Start = useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
      return;
    }
    if (timer === 0) {
      return;
    }
    IntervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer < 1) {
          clearInterval(IntervalId.current);
          IntervalId.current = null;
          play();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1);
  }, [timer]);
  const Reset = useCallback(() => {
    Stop();
    setTimer(startTime);
  }, [startTime]);
  const Stop = useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
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

    return {
      hoursTime,
      minutesTime,
      secondsTime,
      progress,
    };
  }, [timer, startTime]);
  const Itog = useCallback(() => {
    return (
      (time.hoursTime <= 0
        ? "00"
        : time.hoursTime < 10
        ? "0" + time.hoursTime
        : time.hoursTime) +
      ":" +
      (time.minutesTime <= 0
        ? "00"
        : time.minutesTime < 10
        ? "0" + time.minutesTime
        : time.minutesTime) +
      ":" +
      (time.secondsTime <= 0
        ? "00"
        : time.secondsTime < 10
        ? "0" + time.secondsTime
        : time.secondsTime)
    );
  }, [time.hoursTime, time.minutesTime, time.secondsTime]);
  return (
    <div className="timerH3">
      <h1>Countdown</h1>
      <StileHead>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Itog()}
        </div>
        <LinearProgress variant="determinate" value={time.progress} />
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
