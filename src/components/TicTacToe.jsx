import { useState, useEffect } from "react";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);

  const toggle = (num) => {
    if (lock || board[num] !== "") return;

    const newBoard = [...board];
    newBoard[num] = count % 2 === 0 ? "X" : "O";
    setBoard(newBoard);
    setCount(count + 1);
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
    setTie(false);
  };

  const renderIcon = (value) => {
    if (value === "X")
      return <img className="w-12 h-12" src={crossIcon} alt="X" />;
    if (value === "O")
      return <img className="w-12 h-12" src={circleIcon} alt="O" />;
    return null;
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkTie = (board) => {
    if (board.every((value) => value !== "") && !checkWinner(board)) {
      setTie(true);
    }
  };

  // useEffect per controllare il vincitore dopo ogni mossa
  useEffect(() => {
    checkTie(board);
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      setLock(true);
    }
  }, [board]);

  return (
    <div className="h-[100vh] w-[100vw] bg-slate-900 text-cyan-100 text-6xl font-bold flex flex-col justify-center items-center">
      <h1 className="mb-4">
        <span className="text-amber-300">Tic</span>
        <span className="text-cyan-400">Tac</span>
        <span className="text-emerald-400">Toe</span>
      </h1>
      {winner ? (
        <h2 className="text-5xl font-bold text-emerald-400 mb-8">
          The winner is: {winner}
        </h2>
      ) : (
        <h2 className="text-5xl font-bold text-transparent mb-8">
          The winner is:
        </h2>
      )}
      {tie && (
        <h2 className="text-5xl font-bold text-emerald-400 mb-8">
          It's a tie!
        </h2>
      )}
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1} flex`}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes w-24 h-24 flex items-center justify-center border-2 rounded-lg border-cyan-200/40 cursor-pointer m-1"
                  onClick={() => toggle(index)}
                >
                  {renderIcon(board[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button
        onClick={reset}
        className="px-6 py-3 m-1 text-[2.5rem] rounded-lg bg-emerald-600/70 hover:bg-emerald-400 mt-10"
      >
        RESET
      </button>
    </div>
  );
};
