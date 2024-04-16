import React, { useRef, useState, memo } from "react";
import Button from "./btn";
function TimerComponent() {
  const [timer, setTimer] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const IntervalId = useRef();
  const Start = () => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
      return;
    }
    IntervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 59) {
          setSeconds((prevSeconds) => {
            if (prevSeconds === 59) {
              setMinutes((prevMinutes) => prevMinutes + 1);
              return 0;
            }
            return prevSeconds + 1;
          });
          return 0;
        }
        return prevTimer + 1;
      });
    }, 1000);
  };
  const Stop = () => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
    }
  };

  return (
    <div>
      <h1>Timer</h1>
      <h1>
        
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}:
        {timer < 10 ? "0" + timer : timer}
      </h1>
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

export default memo(TimerComponent);
