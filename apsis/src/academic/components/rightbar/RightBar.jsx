import "./RightBar.css";

function RightBar({ isOpen, onClose, givenGroup, givenId, from }) {
  return (
    <>
      <>
        <div
          className={`overlay ${isOpen ? "open" : ""}`}
          onClick={onClose}
        ></div>
        <div className={`right-bar ${isOpen ? "open" : ""} `}>
          <div className="right-bar-header">
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
          <div className="right-bar-content">
            <div className="right-bar-content-header">
              <h1>{givenGroup}</h1>
            </div>
            <div className="right-bar-content-body">
              <p>{givenId}</p>
            </div>
            <div className="right-bar-content-body">
              <p>{from}</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default RightBar;
