import React from "react";
import "./errorPopup.css";
import { RiCloseLine } from "react-icons/ri";

function ErrorPopup({ errorMassage, setErrorTriggers, errorTriggers }) {
  return (
    <div className="popup__container">
      <div className="popup__popup__container">
        <div className="popup__popup__closeBtn">
          <RiCloseLine size="30" onClick={() => setErrorTriggers(false)} />
        </div>
        <div className="popup__popup__message">
          <span className="popup__popup__message-content">
            <strong>Error:</strong>
          </span>
          <span className="popup__popup__message-content">
            <strong>{errorMassage}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ErrorPopup;
