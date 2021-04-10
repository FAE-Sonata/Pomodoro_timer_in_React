import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

function BreakIncrements({breakObj, isActiveSession}) {
  const {breakLength, increaseFn, decreaseFn} = breakObj;
  return (
    <div className="col">
        <div className="float-right">
        <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
            Break Duration: {minutesToDuration(breakLength / (6E4))}
            </span>
            <div className="input-group-append">
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                disabled={isActiveSession}
                onClick={decreaseFn}
            >
                <span className="oi oi-minus" />
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                disabled={isActiveSession}
                onClick={increaseFn}
            >
                <span className="oi oi-plus" />
            </button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default BreakIncrements;