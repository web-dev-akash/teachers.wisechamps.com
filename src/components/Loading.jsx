import React from "react";
import { ring } from "ldrs";
ring.register();

export const Loading = () => {
  return (
    <div
      id="loadingDiv"
      style={{
        width: "fit-content",
      }}
    >
      <l-ring
        size="45"
        stroke="8"
        bg-opacity="0.2"
        speed="2"
        color="#5853fc"
      ></l-ring>
    </div>
  );
};
