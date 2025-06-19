import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#ccc",
  progressColor: "#0178ff",
  cursorColor: "transparent",
  resposnive: true,
  height: 80,
  normalize: true,
  backend: "WebAudio",
  barWidth: 2,
  barGap: 3,
});

function AudioPlayer({ audioFile }) {
  const waveFormRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioFileName, setAudioFileName] = useState("");

  useEffect(() => {
    const options = formWaveSurferOptions(waveFormRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(audioFile);

    wavesurfer.current.on("ready", () => {
      setVolume(wavesurfer.current.getVolume());
      setDuration(wavesurfer.current.getDuration());
      setAudioFileName(audioFile.split("/").pop());
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    return () => {
      wavesurfer.current.un("audioprocess");
      wavesurfer.current.un("ready");
      wavesurfer.current.destroy();
    };
  }, [audioFile]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handeMute = () => {
    setMuted(!muted);
    wavesurfer.current.setVolume(muted ? volume : 0);
  };

  const handeVolumeChange = (newVolume) => {
    setVolume(newVolume);
    wavesurfer.current.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleVolumeDown = () => {
    handeVolumeChange(Math.min(volume - 0.1, 1));
  };

  const handleVolumeUp = () => {
    handeVolumeChange(Math.min(volume + 0.1, 1));
  };

  const formatTime = (seconds) => {
    let date = new Date(0);
    date.setSeconds(seconds);
    // return date.toISOString().substring(11, 8);
    return date.toISOString().substring(11, 22);
  };

  return (
    <div className="w-1/2 h-1/2 grid grid-cols-1 justify-center content-evenly p-5 glass rounded-box font-poppins">
      <div ref={waveFormRef}></div>
      <div className="text-xl">
        <p>
          <span className="font-bold text-primary">Now Playing </span>
          {audioFileName}
        </p>
        <p>
          <span className="font-bold">Duration </span> {formatTime(duration)}{" "}
          <span className="font-bold">Current Time </span>{" "}
          {formatTime(currentTime)}
        </p>
      </div>
      <div>
        <button className="btn btn-primary" onClick={handlePlayPause}>
          {!playing ? "Play" : "Pause"}
        </button>
        <button className="btn btn-secondary" onClick={handeMute}>
          {muted ? "Unmute" : "Mute"}
        </button>
        <p>Volume: {Math.round(volume * 100)}</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={muted ? 0 : volume}
          class="range"
          onChange={(e) => handeVolumeChange(parseFloat(e.target.value))}
        />
        <button className="btn btn-ghost" onClick={handleVolumeUp}>
          vol +
        </button>
        <button className="btn btn-ghost" onClick={handleVolumeDown}>
          vol -
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
