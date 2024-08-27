import React from "react";
import { useNavigate } from "react-router-dom";

export const NoAttempt = () => {
  const navigate = useNavigate();
  return (
    <div className="email-not-found">
      <p>
        Entered Winner's Student ID is not correct <br />
        Please try again with correct id.
      </p>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <button id="submit-btn" onClick={() => navigate("/attendance")}>
          Try Again
        </button>
      </div>
    </div>
  );
};
