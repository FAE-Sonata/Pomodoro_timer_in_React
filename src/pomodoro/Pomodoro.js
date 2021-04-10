import React, { useState } from "react";
// import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration, secondsToDuration } from "../utils/duration";
import FocusIncrements from "./FocusIncrements";
import BreakIncrements from "./BreakIncrements";
import PlayPauseButton from "./PlayPauseButton";
import StopButton from "./StopButton";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isActiveSession, setIsActiveSession] = useState(false);
  // begins with a focus session by default
  const [isFocus, setIsFocus] = useState(true);

  const MINUTE_MILLISECONDS = 60 * 1000;
  const DEFAULT_FOCUS = 25; const DEFAULT_BREAK = 5;
  const FOCUS_LIMITS = [5, 60]; const BREAK_LIMITS = [1, 15];
  const [focusLength, setFocusLength] = useState(DEFAULT_FOCUS *
    MINUTE_MILLISECONDS);
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK *
    MINUTE_MILLISECONDS);

  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);

  function displayMinutes(ms) {
    return minutesToDuration(ms / MINUTE_MILLISECONDS);
  }

  /* next four functions (supplied to two components) ensure that lower / upper
  bounds of focus (break) length not breached */
  const decreaseFocus = () => {
    if(focusLength > FOCUS_LIMITS[0] * MINUTE_MILLISECONDS)
      setFocusLength((prevLength) => {return (prevLength -
        5 * MINUTE_MILLISECONDS)});
  };

  const increaseFocus = () => {
    if(focusLength < FOCUS_LIMITS[1] * MINUTE_MILLISECONDS)
    setFocusLength((prevLength) => {return (prevLength +
      5 * MINUTE_MILLISECONDS)});
  };
  
  const decreaseBreak = () => {
    if(breakLength > BREAK_LIMITS[0] * MINUTE_MILLISECONDS)
      setBreakLength((prevLength) => {return (prevLength -
        MINUTE_MILLISECONDS)});
  };

  const increaseBreak = () => {
    if(breakLength < BREAK_LIMITS[1] * MINUTE_MILLISECONDS)
      setBreakLength((prevLength) => {return (prevLength +
        MINUTE_MILLISECONDS)});
  };

  const incrementTimer = () => {
    const maxTime = isFocus ? (focusLength) : (breakLength);
    // millisecond var lags behind timer by 1s (1000 ms)
    if(elapsedMilliseconds + 1000 >= maxTime) {
      // play alarm upon time expiry
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      setElapsedMilliseconds(0);
      setIsFocus((prev) => !prev);// focus to break; break to new focus session
    }
    // increment by 1s (1000 ms)
    else setElapsedMilliseconds((ms) => ms + 1000);
  };

  const stopSession = () => {
    setElapsedMilliseconds(0);
    setIsTimerRunning(false); setIsActiveSession(false);
  };

  const statusText = () => {
    return (isFocus ? ("Focusing") : ("On Break"));
  };

  const statusTime = () => {
    const res_ms = (isFocus ? (focusLength) : (breakLength));
    return displayMinutes(res_ms);
  }

  const currentTimeSession = () => {
    return `${statusText()} for ${statusTime()} minutes`;
  };

  const remainder = () => {
    return (isFocus ? (focusLength - elapsedMilliseconds) : (breakLength -
      elapsedMilliseconds));
  };

  const pctProgress = () => {
    return 100 * (isFocus ? (elapsedMilliseconds / focusLength) : (
      elapsedMilliseconds / breakLength));
  };

  // sets style variable in div above
  const hideSession = () => {
    return { display: isActiveSession ? "block" : "none" };
  };

  useInterval(
    () => {
      incrementTimer();
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if(!isActiveSession) setIsActiveSession(true);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusIncrements focusObj={{
          focusLength: focusLength,
          increaseFn: increaseFocus,
          decreaseFn: decreaseFocus,
        }} isActiveSession = {isActiveSession}/>
        <BreakIncrements breakObj={{
          breakLength: breakLength,
          increaseFn: increaseBreak,
          decreaseFn: decreaseBreak,
        }} isActiveSession = {isActiveSession}/>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <PlayPauseButton handlePlayPause={playPause}
              isTimerRunning={isTimerRunning}/>
            <StopButton handleStop={stopSession}
              isActiveSession={isActiveSession}/>
          </div>
        </div>
      </div>
      <div style={hideSession()}>
        <div className="row mb-2" >
          <div className="col">
            <h2 data-testid="session-title">{currentTimeSession()}</h2>
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(remainder() / 1000)} remaining
            </p>
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
                aria-valuenow={pctProgress()}
                style={{ width: `${pctProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;