import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ children }) => {
  const mode = useSelector((state) => state.mode);
  if (mode !== "user") {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};
