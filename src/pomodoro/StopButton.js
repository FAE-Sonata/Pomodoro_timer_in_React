import React from "react";

function StopButton({handleStop, isActiveSession}) {
  return (
    <button
        type="button"
        className="btn btn-secondary"
        title="Stop the session"
        disabled={!isActiveSession}
        onClick={handleStop}
    >
        <span className="oi oi-media-stop" />
    </button>
  );
}

export default StopButton;