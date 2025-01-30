import React, { useState } from "react";
import Cell from "./Cell";

const Table = ({ board, setBoard, turn, setTurn, setLines }) => {
  const symbols = ["C", "M", "T"];
  const [highlightedCells, setHighlightedCells] = useState([]); // Tracks winning cells

  const handleClick = (row, col) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((rowArr, rIdx) =>
      rowArr.map((cell, cIdx) => (rIdx === row && cIdx === col ? symbols[turn % 3] : cell))
    );
    
    setBoard(newBoard);
    setTurn(turn + 1);
    checkLines(newBoard);

    // Checking if the board is empty
    if (newBoard.flat().every(cell => cell !== null)) {
      checkLines(newBoard);
    }
  };

  const checkLines = (board) => {
    let rowLines = 0;
    let colLines = 0;
    let diagLines = 0;

    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal \
      [1, -1], // Diagonal /
    ];

    const winningCells = [];
    const colorLines = { C: 0, M: 0, T: 0 };

    // Checking if the cell is within bounds
    const isValid = (r, c) => r >= 0 && r < 5 && c >= 0 && c < 5;



    const findLine = (r, c, dr, dc, char) => {
      const cells = [];
      let count = 0;

      while (isValid(r, c) && board[r][c] === char) {
        count++;
        cells.push([r, c]);
        r += dr;
        c += dc;
      }

      if (count >= 3) {
        winningCells.push(...cells);
        colorLines[char]++;
      }
    };

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const char = board[r][c];
        if (!char) continue;

        for (let [dr, dc] of directions) {
          findLine(r, c, dr, dc, char);
        }
      }
    }

    setHighlightedCells(winningCells);
    setLines(colorLines.C + colorLines.M + colorLines.T);

    // Checking winning rows
    for (let r = 0; r < 5; r++) {
      if (hasWinningLine(board[r])) rowLines++;
    }

    // Checking winning columns
    for (let c = 0; c < 5; c++) {
      const column = board.map(row => row[c]);
      if (hasWinningLine(column)) colLines++;
    }

    // Checking winning diagonals
    const diagonals = getAllDiagonals(board);
    for (const diag of diagonals) {
      if (hasWinningLine(diag)) diagLines++;
    }

    // Sum of winning lines
    setLines(rowLines + colLines + diagLines);
  };

  // Helper function for checking the winning line
  const hasWinningLine = (array) => {
    for (let i = 0; i <= array.length - 3; i++) {
      if (array[i] && array[i] === array[i + 1] && array[i] === array[i + 2]) {
        return true;
      }
    }
    return false;
  };

  // Collects all diagonals which contain at least 3 cells
  const getAllDiagonals = (board) => {
    const diagonals = [];

    for (let start = 0; start <= 2; start++) {
      diagonals.push(board.slice(start).map((row, i) => row[i]).filter(cell => cell !== undefined)); // Top left -> bottom right
      diagonals.push(board.slice(start).map((row, i) => row[4 - i]).filter(cell => cell !== undefined)); // Top right -> bottom left
      if (start !== 0) { 
        diagonals.push(board.map((row, i) => row[i + start]).filter(cell => cell !== undefined)); // Bottom left -> top right
        diagonals.push(board.map((row, i) => row[4 - (i + start)]).filter(cell => cell !== undefined)); // Bottom right -> top left
      }
    }

    return diagonals.filter(diag => diag.length >= 3);
  };

  return (
    <table cellSpacing="0" cellPadding="0" style={{borderCollapse: "collapse", margin: "0 auto"}}>
      <tbody>
        {board.map((row, rIdx) => (
          <tr key={rIdx}>
            {row.map((cell, cIdx) => (
              <Cell
                key={cIdx}
                value={cell}
                isHighlighted={highlightedCells.some(([r, c]) => r === rIdx && c === cIdx)}
                onClick={() => handleClick(rIdx, cIdx)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
