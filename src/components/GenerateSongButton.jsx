import { useNavigate } from "react-router-dom";
import RightArrow from "./icons/RightArrow";

function GenerateSongButton({ handleSubmit }) {
  return (
    <div className="w-full flex justify-center align-middle m-3">
      <button
        className="btn btn-success btn-block btn-soft font-poppins"
        onClick={handleSubmit}
      >
        Generate <RightArrow />
      </button>
    </div>
  );
}

export default GenerateSongButton;
