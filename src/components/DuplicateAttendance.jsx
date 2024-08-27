import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attendanceAdded } from "../Redux/reducer";

export const DuplicateAttendance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTryAgain = async () => {
    dispatch(attendanceAdded({ status: 0 }));
    navigate("/attendance");
  };

  console.log("first");
  return (
    <div className="email-not-found">
      <h1>OOPS !</h1>
      <p style={{ fontSize: "20px" }}>
        Your Attendance for today is already marked
      </p>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <button id="submit-btn" onClick={handleTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
};
