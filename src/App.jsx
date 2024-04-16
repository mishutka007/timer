import React, { useState } from "react";
import TimerComponent from "./components/Timer";
import "./components/timer.css";
import CountdownComponents from "./components/CountdownComponents";
import TimePickerViews from "./components/iimex";

function App() {
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  return (
    <div className="App">
      <div>
        <h1 className="timerH1">
          <TimerComponent />
        </h1>
        <h1 className="timerH2">
          
          <CountdownComponents
            time={time}
            minutes={minutes}
            seconds={seconds}
          />
          
          <TimePickerViews
            onChange={setTime}
            onChange1={setMinutes}
            onChange2={setSeconds}
          />
        </h1>
       
      </div>
    </div>
  );
}

export default App;
