import { Link } from "react-router-dom";
import bg from "../assets/stacked-wave-bg.svg";
import RightArrow from "../components/icons/RightArrow";

function NotFoundPage() {
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
            <h1 className="mb-5 text-8xl font-bungee">404 Not Found!</h1>
            <p className="mb-5 font-poppins">
              the page your looking for doesnt exist!
            </p>
            <Link to={"/"}>
              <button className="btn btn-primary font-poppins">
                Go Back
                <RightArrow />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
