function LyricsTextArea({ lyrics, setLyrics }) {
  const handleChange = (e) => {
    setLyrics(e.target.value);
  };

  return (
    <div className="w-full flex justify-center align-middle m-3">
      <fieldset className="fieldset w-full">
        <h1 className="font-bungee text-3xl text-center m-1">
          Enter your Lyrics
        </h1>
        <textarea
          className="textarea h-24 w-full font-poppins"
          placeholder="roses are red, i burnt by bread"
          value={lyrics}
          onChange={handleChange}
        ></textarea>
        {/* <div className="label">Optional</div> */}
      </fieldset>
    </div>
  );
}

export default LyricsTextArea;
