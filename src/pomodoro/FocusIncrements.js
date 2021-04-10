import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function FocusIncrements({focusObj, isActiveSession}) {
  const {focusLength, increaseFn, decreaseFn} = focusObj;
  return (
    <div className="col">
        <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(focusLength / (6E4))}
        </span>
        <div className="input-group-append">
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled={isActiveSession}
                onClick={decreaseFn}
            >
            <span className="oi oi-minus" />
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled={isActiveSession}
                onClick={increaseFn}
            >
            <span className="oi oi-plus" />
            </button>
        </div>
        </div>
    </div>
  );
}

export default FocusIncrements;