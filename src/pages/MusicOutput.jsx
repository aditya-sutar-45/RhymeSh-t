import audioFile from "../assets/test music.mp3";
import AudioPlayer from "../components/AudioPlayer";

function MusicOutput() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full flex justify-center items-center flex-wrap">
        <AudioPlayer audioFile={audioFile} />
      </div>
    </div>
  );
}

export default MusicOutput;
