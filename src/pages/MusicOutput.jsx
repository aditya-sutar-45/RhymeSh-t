import audioFile from "../assets/test music.mp3";
import AudioPlayer from "../components/AudioPlayer";

function MusicOutput() {
  return (
    <div className="h-screen w-screen">
      <h1 className="font-bungee text-5xl m-3">Music Output</h1>
      <div className="h-full w-full flex justify-center items-center">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default MusicOutput;
