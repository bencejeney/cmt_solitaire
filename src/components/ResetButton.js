import React from "react";

const ResetButton = ({ resetGame }) => (
  <button onClick={resetGame} style={{ marginTop: "20px" }}>
    Reset Game
  </button>
);

export default ResetButton;
