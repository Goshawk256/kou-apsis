import "./RightBar.css";
import { useState } from "react";
function RightBar({ isOpen, onClose, givenGroup, givenId, from }) {
  const [requestUrl, setRequestUrl] = useState("");
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
