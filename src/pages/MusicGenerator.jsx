import { Link, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import GenerateSongButton from "../components/GenerateSongButton";
import LyricsTextArea from "../components/LyricsTextArea";
import VibeSelector from "../components/VibeSelector";
import { useState } from "react";

function MusicGenerator() {
  const navigate = useNavigate();

  const [selectedVibes, setSelectedVibes] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!lyrics) {
      setError("Lyrics are empty!");
      return;
    }
    if (selectedVibes.length === 0) {
      setError("Please select atleast one vibe!");
      return;
    }
    setError("");
    console.log(selectedVibes);
    console.log(lyrics);

    navigate("/output");
  };

  return (
    <>
      {error && <ErrorAlert error={error} toggle={() => setError("")} />}
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-128 w-3/6 p-2 grid grid-cols-1">
          <div className="flex justify-center items-center">
            <VibeSelector
              selectedVibes={selectedVibes}
              setSelectedVibes={setSelectedVibes}
            />
          </div>
          <div className="flex justify-center items-center">
            <LyricsTextArea lyrics={lyrics} setLyrics={setLyrics} />
          </div>
          <div className="flex justify-center items-center">
            <Link to={"/"}>
              <button className="btn btn-error btn-soft">Back</button>
            </Link>
            <GenerateSongButton
              selectedVibes={selectedVibes}
              lyrics={lyrics}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicGenerator;
