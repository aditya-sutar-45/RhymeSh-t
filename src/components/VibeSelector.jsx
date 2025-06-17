import ErrorAlert from "./ErrorAlert";
import { useState } from "react";
import { vibes } from "../data/constants";

function VibeSelector({ selectedVibes, setSelectedVibes }) {
  const [vibeEror, setVibeError] = useState("");

  const selectVibe = (vibe) => {
    if (selectedVibes.length >= 3) {
      setVibeError("cannot add more than 3 vibes :(");
      return;
    }

    if (selectedVibes.includes(vibe)) {
      setVibeError("vibe already selected!");
      return;
    }

    setVibeError("");
    setSelectedVibes([...selectedVibes, vibe]);
  };

  const removeVibe = (vibe) => {
    setSelectedVibes(selectedVibes.filter((v) => v !== vibe));
    if (vibeEror) {
      setVibeError("");
    }
  };

  return (
    <>
      {vibeEror && (
        <ErrorAlert error={vibeEror} toggle={() => setVibeError("")} />
      )}
      <div className="w-full m-3 p-3 flex flex-col align-middle justify-center glass rounded-box">
        <h1 className="font-bungee text-3xl text-center m-1">Pick a vibe 😎</h1>
        <div className="join mx-auto my-2">
          {vibes.map((v, i) => (
            <button
              key={i}
              className="btn btn-dash btn-primary m-1 font-poppins"
              disabled={selectedVibes.includes(v)}
              onClick={() => selectVibe(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="w-1/2 h-12 m-auto flex align-middle justify-center p-3">
          {selectedVibes.map((v, i) => (
            <div
              key={i}
              className="badge badge-soft p-4 badge-secondary mx-1 font-poppins"
            >
              {v}
              <button
                className="btn btn-circle size-2 font-poppins"
                onClick={() => removeVibe(v)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default VibeSelector;
