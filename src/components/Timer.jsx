import React, { useRef, useState, memo, useCallback } from "react";
import Button from "./Button";
function TimerComponent() {
  const [hour, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const IntervalId = useRef();
  const Start = useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
      return;
    }
    IntervalId.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHour((prevHour) => prevHour + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1);
  }, []);
  const Stop = useCallback(() => {
    if (IntervalId.current) {
      clearInterval(IntervalId.current);
      IntervalId.current = null;
    }
  }, []);

  return (
    <div>
      <h1>Timer</h1>
      <h1>
        {hour < 10 ? "0" + hour : hour}:{minutes < 10 ? "0" + minutes : minutes}
        :{seconds < 10 ? "0" + seconds : seconds}
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
          setHour(0);
        }}
        text="Сброс"
      />
    </div>
  );
}

export default memo(TimerComponent);
