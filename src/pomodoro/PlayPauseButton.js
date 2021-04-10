import React from "react";
import classNames from "../utils/class-names";

function PlayPauseButton({handlePlayPause, isTimerRunning}) {
  return (
    <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={handlePlayPause}
    >
        <span className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
        })}
        />
    </button>
  );
}

export default PlayPauseButton;