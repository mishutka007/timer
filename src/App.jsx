import React from "react";
import TimerComponent from "./components/Timer";
import "./components/timer.css";
import CountdownComponents from "./components/CountdownComponents";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="timerH1">
          <TimerComponent />
        </h1>
        <h1 className="timerH2">
          <CountdownComponents />
        </h1>
      </div>
    </div>
  );
}

export default App;
