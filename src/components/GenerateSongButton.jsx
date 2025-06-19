import { ArrowRight } from "lucide-react";

function GenerateSongButton({ handleSubmit }) {
  return (
    <div className="w-full flex justify-center align-middle m-3">
      <button
        className="btn btn-success btn-block btn-soft font-poppins"
        onClick={handleSubmit}
      >
        Generate <ArrowRight />
      </button>
    </div>
  );
}

export default GenerateSongButton;
