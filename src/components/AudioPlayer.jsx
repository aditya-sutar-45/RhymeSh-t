import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  ArrowLeft,
  ArrowRight,
  HeadphoneOff,
  Headphones,
  Pause,
  Play,
  Timer,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    return date.toISOString().substring(14, 22);
  };

  return (
    <div className="w-1/2 h-80 grid grid-cols-1 justify-center content-evenly p-5 outline-1 rounded-box font-poppins">
      <div className="flex justify-start items-center gap-2">
        <div className="tooltip" data-tip="Back To Home">
          <button
            className="btn btn-error btn-sm btn-square btn-soft"
            onClick={() => {
              if (wavesurfer.current && playing) {
                wavesurfer.current.pause();
              }
              navigate("/");
            }}
          >
            <ArrowLeft size={16} />
          </button>
        </div>
        <span className="font-bungee text-3xl">Your Jam</span>
      </div>
      <div ref={waveFormRef}></div>
      <div className="flex gap-2 justify-between items-center glass p-2.5 rounded-box mx-2">
        <div className="join join-vertical">
          <button
            className="btn btn-primary btn-sm join-item"
            onClick={handlePlayPause}
          >
            {!playing ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button
            className="btn btn-soft btn-error btn-sm join-item"
            onClick={handeMute}
          >
            {muted ? <Headphones size={16} /> : <HeadphoneOff size={16} />}
          </button>
        </div>
        <div className="text-xl mr-auto">
          <p>{audioFileName}</p>
          <div className="flex gap-1">
            <Timer />{" "}
            <span className="text-primary">{formatTime(currentTime)}</span>/
            {formatTime(duration)}
          </div>
        </div>
        <div>
          <div>
            <div className="flex justify-between">
              <span>Vol: {Math.round(volume * 100)}</span>
              <div className="join join-horizontal">
                <button
                  className="btn btn-outline btn-square btn-sm join-item"
                  onClick={handleVolumeDown}
                >
                  <Volume1 size={20} />
                </button>
                <button
                  className="btn btn-outline btn-square btn-sm join-item"
                  onClick={handleVolumeUp}
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              className="range range-xs"
              onChange={(e) => handeVolumeChange(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
