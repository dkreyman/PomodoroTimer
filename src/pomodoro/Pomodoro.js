import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Duration from "./Duration";
import TimeDisplay from "./DisplayTimer";

function Pomodoro() {
  const [focusDuration, setFocusDuration] = useState(25);
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [phase, setPhase] = useState("Focusing");
  const [initialphase, setInitialphase] = useState(true);
  //duration is a h1 label
  const [time, setTime] = useState(focusDuration * 60);
  const [duration, setDuration] = useState(25 * 60);

  const plusFocusHandler = () => {
    if (focusDuration < 60 && initialphase) {
      setTime(time + 5 * 60);
      setDuration(time + 5 * 60);
      setFocusDuration(focusDuration + 5);
    }
  };
  const minusFocusHandler = () => {
    if (focusDuration > 5 && initialphase) {
      setTime(time - 5 * 60);
      setDuration(time - 5 * 60);
      setFocusDuration(focusDuration - 5);
    }
  };
  const [breakDuration, setBreakDuration] = useState(5);
  const plusBreakHandler = () => {
    if (breakDuration < 15 && initialphase) {
      setBreakDuration(breakDuration + 1);
    }
  };
  const minusBreakHandler = () => {
    if (breakDuration > 1 && initialphase) {
      setBreakDuration(breakDuration - 1);
    }
  };

  const reset = () => {
    setIsTimerRunning(false);
    setInitialphase(true);
    setDuration(focusDuration * 60);
    setTime(focusDuration * 60);
    setPhase("Focusing");
  };

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setTime(time - 1);

      if (time === 1) {
        setIsTimerRunning(false);
        new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        if (phase === "Focusing") {
          setTime(breakDuration * 60);
          setDuration(breakDuration * 60);
          setPhase("On Break");
        } else {
          reset();
          setInitialphase(false);
        }
      } else if (phase !== "On Break") {
        setPhase("Focusing");
        setIsTimerRunning(true);
      }
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    setInitialphase(false);
  }

  return (
    <div className="pomodoro">
      <Duration
        plusFocusHandler={plusFocusHandler}
        minusFocusHandler={minusFocusHandler}
        plusBreakHandler={plusBreakHandler}
        minusBreakHandler={minusBreakHandler}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        initialphase={initialphase}
      />
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={reset}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <TimeDisplay
        phase={phase}
        duration={duration}
        time={time}
        initialphase={initialphase}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
