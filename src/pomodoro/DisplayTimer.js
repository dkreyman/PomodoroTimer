import React from "react";
import { secondsToDuration } from "../utils/duration";

// function nextTick(prevState) {
//   const timeRemaining = Math.max(0, prevState.time - 1);
//   const elapsedSeconds = prevState.duration - time;
//   return {
//     ...prevState,
//     timeRemaining,
//     percentComplete: (elapsedSeconds / prevState.duration) * 100,
//   };
// }

function TimeDisplay({ phase, duration, time, isTimerRunning, initialphase }) {
  let pauseDisplay;
  if (!isTimerRunning & (time !== duration)) {
    pauseDisplay = "block";
  } else {
    pauseDisplay = "none";
  }

  let countDown = 100 - (time / duration) * 100;
  if (!initialphase) {
    return (
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
              {phase} for {secondsToDuration(duration)} minutes
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(time)} remaining
            </p>
            <h2 style={{ display: pauseDisplay }}>PAUSED</h2>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={countDown} // TODO: Increase aria-valuenow as elapsed time increases
                style={{
                  width: countDown + "%",
                }} // TODO: Increase width % as elapsed time increases
              />
              {console.log(countDown + "%")}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default TimeDisplay;
