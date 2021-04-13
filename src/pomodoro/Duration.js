import React from "react";
import classNames from "../utils/class-names";
import { minutesToDuration } from "../utils/duration";

function Duration({
  plusFocusHandler,
  minusFocusHandler,
  plusBreakHandler,
  minusBreakHandler,
  focusDuration,
  breakDuration,
  phase,
}) {
  const btnClass = classNames({
    "btn btn-secondary": phase === "Focus",
    "btn btn-secondary disabled": phase !== "Focus",
  });
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            {/* TODO: Update this text to display the current focus session duration */}
            Focus Duration: {minutesToDuration(focusDuration)}
          </span>
          <div className="input-group-append">
            {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
            <button
              type="button"
              className={btnClass}
              data-testid="decrease-focus"
              onClick={minusFocusHandler}
            >
              <span className="oi oi-minus" />
            </button>
            {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
            <button
              type="button"
              className={btnClass}
              data-testid="increase-focus"
              onClick={plusFocusHandler}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              {/* TODO: Update this text to display the current break session duration */}
              Break Duration: {minutesToDuration(breakDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className={btnClass}
                data-testid="decrease-break"
                onClick={minusBreakHandler}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
              <button
                type="button"
                className={btnClass}
                data-testid="increase-break"
                onClick={plusBreakHandler}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Duration;
