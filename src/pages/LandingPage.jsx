import { Link } from "react-router-dom";
import bg from "../assets/stacked-wave-bg.svg";
import { ArrowRight } from "lucide-react";

function LandingPage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        {/* <div className="hero-overlay"></div> */}
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-9xl font-bungee">Rhyme Sh*t</h1>
            <p className="mb-5 font-poppins">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to={"/generate"}>
              <button className="btn btn-primary font-poppins">
                Get Started <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
