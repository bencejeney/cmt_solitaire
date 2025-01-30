import React from "react";

const Cell = ({ value, isHighlighted, onClick }) => {
  const getColor = () => {
    if (isHighlighted) {
      if (value === "C") return "green";
      if (value === "M") return "blue";
      if (value === "T") return "red";
    }
    return "black"; // Default color
  };

  return (
    <td
      style={{
        width: "50px",
        height: "50px",
        textAlign: "center",
        border: "1px solid black",
        fontSize: "20px",
        color: getColor(),
        cursor: value === null ? "pointer" : "not-allowed",
        
      }}
      onClick={onClick}
    >
      {value}
    </td>
  );
};

export default Cell;
