import React from "react";
import "./ErrorPages.css";

function NotFound() {
  return (
    /* From Uiverse.io by andrew-demchenk0 */
    <div className="warning">
      <div className="warning__icon">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z"
            fill="#393a37"
          ></path>
        </svg>
      </div>
      <div className="warning__title">Herhangi bir bilgi bulunamadı</div>
    </div>
  );
}

export default NotFound;
