import React, { useState } from "react";
import Table from "./components/Table";
import ResetButton from "./components/ResetButton";

const App = () => {
  const [board, setBoard] = useState(Array(5).fill(Array(5).fill(null)));
  const [turn, setTurn] = useState(0); // Round-robin counter for C, M, T
  const [lines, setLines] = useState(0);

  const resetGame = () => {
    setBoard(Array(5).fill(Array(5).fill(null)));
    setTurn(0);
    setLines(0);
  };

  return (
    <div>
      <h1>5x5 Table Game</h1>
      <Table board={board} setBoard={setBoard} turn={turn} setTurn={setTurn} setLines={setLines} />
      <ResetButton resetGame={resetGame} />
      <h2>
        {board.flat().every(cell => cell !== null)
          ? lines > 0
            ? `Congratulations, you have ${lines} line${lines > 1 ? "s" : ""}!`
            : "You have no lines, try again!"
          : "Keep playing!"}
      </h2>
    </div>
  );
};

export default App;
