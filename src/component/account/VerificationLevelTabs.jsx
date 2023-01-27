import React from "react";
import { Link } from "react-router-dom";
import { useAccountVerificationContext } from "./AccountVerificationContext";

export default function VerificationLevelTabs() {
  const { level, setLevel } = useAccountVerificationContext();

  return (
    <div>
      <div className="level-step">
        <ul>
          {[1, 2, 3].map((l) => (
            <li key={l}>
              <button
                type="button"
                className={" step " + (level > l - 1 && " active ")}
                // onClick={() => {
                //   setLevel(l);
                // }}
              >
                {level > l - 1 && <img src="/images/level.png"></img>}Level {l}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
