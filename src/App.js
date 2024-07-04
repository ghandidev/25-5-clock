import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function Clock() {
  const [timeBreak, setTimeBreak] = useState(5);
  const [timeSession, setTimeSession] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [typeTimer, setTypeTimer] = useState('Session');
  const [start, setStart] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    let timer;
    if (start && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const beepSound = document.getElementById("beep");
      beepSound.play();
      if (typeTimer === 'Session') {
        setTypeTimer('Break');
        setTimeLeft(timeBreak * 60);
      } else {
        setTypeTimer('Session');
        setTimeLeft(timeSession * 60);
      }
    }
    return () => clearTimeout(timer);
  }, [start, timeBreak, timeLeft, timeSession, typeTimer]);

  useEffect(() => {
    if (timeLeft < 60) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  }, [timeLeft]);

  const incrementBreak = () => {
    if (timeBreak < 60) {
      setTimeBreak(timeBreak + 1);
    }
  };

  const decrementBreak = () => {
    if (timeBreak > 1) {
      setTimeBreak(timeBreak - 1);
    }
  };

  const incrementSession = () => {
    if (timeSession < 60) {
      setTimeSession(timeSession + 1);
      setTimeLeft((timeSession + 1) * 60);
    }
  };

  const decrementSession = () => {
    if (timeSession > 1) {
      setTimeSession(timeSession - 1);
      setTimeLeft((timeSession - 1) * 60);
    }
  };

  const handleReset = () => {
    setStart(false);
    setTimeBreak(5);
    setTimeSession(25);
    setTimeLeft(1500);
    setTypeTimer('Session');
    setIsWarning(false);
    const beepSound = document.getElementById("beep");
    beepSound.pause();
    beepSound.currentTime = 0;
  };

  const handleStartStop = () => {
    setStart(!start);
  };

  const timeFormat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="main">
      <h1 className="title">25 + 5 Clock</h1>

      <div id="timer-label" className="box__timer">
        <span>{typeTimer}</span>
        <div className={`displayTimer ${isWarning ? 'warning' : ''}`} id="time-left">
          {timeFormat(timeLeft)}
        </div>
      </div>

      <div className="container__timers">
        <div id="break-label">Break Length</div>
        <div className="break__box">
          <button
            className="btn"
            id="break-decrement"
            onClick={decrementBreak}
            disabled={start}
          >
            -
          </button>
          <div id="break-length">{timeBreak}</div>
          <button
            className="btn"
            id="break-increment"
            onClick={incrementBreak}
            disabled={start}
          >
            +
          </button>
        </div>
        <div id="session-label">Session Length</div>
        <div className="session__box">
          <button
            className="btn"
            id="session-decrement"
            onClick={decrementSession}
            disabled={start}
          >
            -
          </button>
          <div id="session-length">{timeSession}</div>
          <button
            className="btn"
            id="session-increment"
            onClick={incrementSession}
            disabled={start}
          >
            +
          </button>
        </div>
      </div>
      <div className="play__box">
        <button id="start_stop" onClick={handleStartStop}>
          {start ? 'Stop' : 'Start'}
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;
