function ErrorAlert({ error, toggle }) {
  return (
    <div className="toast toast-top toast-start">
      <div className="alert alert-error font-poppins">
        <span>Error: {error}</span>
        <button className="btn btn-ghost" onClick={toggle}>
          X
        </button>
      </div>
    </div>
  );
}

export default ErrorAlert;
