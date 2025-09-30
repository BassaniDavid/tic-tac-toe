import { useState, useEffect } from "react";
import circleIcon from "../assets/circle.png";
import crossIcon from "../assets/cross.png";

export const TicTacToe = () => {
  // // array per salvare le posizioni giocate
  const [board, setBoard] = useState(Array(9).fill(""));
  // // numero di mosse
  const [count, setCount] = useState(0);
  // blocco giocate
  const [lock, setLock] = useState(false);
  // vincitore
  const [winner, setWinner] = useState(null);
  // pareggio
  const [tie, setTie] = useState(false);
  // animazione tasto reset
  const [animate, setAnimate] = useState(false);

  // funzione per giocare al click su una casella
  const toggle = (num) => {
    // controllo lock e se la casella è libera
    if (lock || board[num] !== "") return;

    // crea copia dell array dello stato
    const newBoard = [...board];
    // alterna X e O, salvando la mossa nel nuovo array
    newBoard[num] = count % 2 === 0 ? "X" : "O";
    // aggiorna lo statoc
    setBoard(newBoard);
    // aumenta il numero di mosse
    setCount(count + 1);
  };

  // funzione per il reset della partita che resetta tutti gli stati allo stato iniziale
  const reset = () => {
    setBoard(Array(9).fill(""));
    setCount(0);
    setLock(false);
    setWinner(null);
    setTie(false);
  };

  // funzione per renderizzare l'immagine corretta all'interno della casella cliccata
  const renderIcon = (value) => {
    if (value === "X")
      return (
        <img
          className="w-[60%] h-[60%] lg:w-[35%] lg:h-[35%]"
          src={crossIcon}
          alt="X"
        />
      );
    if (value === "O")
      return (
        <img
          className="w-[60%] h-[60%] lg:w-[35%] lg:h-[35%]"
          src={circleIcon}
          alt="O"
        />
      );
    return null;
  };

  // funzione controllo vincitore in base a righe, colonne e diagonali
  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], // prima riga
      [3, 4, 5], // seconda riga
      [6, 7, 8], // terza riga
      [0, 3, 6], // prima colonna
      [1, 4, 7], // seconda colonna
      [2, 5, 8], // terza colonna
      [0, 4, 8], // diagonale principale
      [2, 4, 6], // diagonale inversa
    ];
    for (let [a, b, c] of lines) {
      // controllo che le tre celle siano uguali e non vuote
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // controllo in caso di parità
  const checkTie = (board) => {
    if (board.every((value) => value !== "") && !checkWinner(board)) {
      setTie(true);
    }
  };

  // useEffect per controllare vincitore e parità dopo ogni mossa
  useEffect(() => {
    checkTie(board);
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      setLock(true);
    }
  }, [board]);

  // useEffect per animazione tasto reset
  useEffect(() => {
    if (winner || tie) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [winner, tie]);

  // messaggio per vincitore o parità
  let statusMessage = null;
  if (winner === "X") {
    statusMessage = (
      <h2 className="text-4xl font-bold text-amber-300 mb-5 animate-pulse">
        The winner is: {winner}
      </h2>
    );
  } else if (winner === "O") {
    statusMessage = (
      <h2 className="text-4xl font-bold text-emerald-400 mb-5 animate-pulse">
        The winner is: {winner}
      </h2>
    );
  } else if (tie) {
    statusMessage = (
      <h2 className="text-4xl font-bold text-cyan-400 mb-5 animate-pulse">
        It&apos;s a tie!
      </h2>
    );
  } else {
    statusMessage = (
      <h2 className="text-4xl font-bold text-transparent mb-5">
        placeholder trasparente
      </h2>
    );
  }

  return (
    <div className="min-h-[100vh] w-[100vw] bg-slate-900 text-cyan-100 text-4xl md:text-6xl xl:text-7xl  font-bold flex flex-col justify-center items-center">
      {/* titolo */}
      <h1 className="mb-4">
        <span className="text-amber-300">Tic</span>
        <span className="text-cyan-400">Tac</span>
        <span className="text-emerald-400">Toe</span>
      </h1>
      {/* messagio vincitore o parità */}
      {statusMessage}
      {/* griglia di gioco*/}
      <div className="board">
        {/* crea le 3 file della griglia di gioco */}
        {[0, 1, 2].map((row) => (
          <div key={row} className={`row${row + 1} flex`}>
            {/* crea le 3 caselle per fila */}
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <div
                  key={index}
                  className="boxes w-[28vw] h-[28vw] max-w-45 max-h-45 flex items-center justify-center border-2 rounded-lg border-cyan-200/40 cursor-pointer m-1"
                  onClick={() => toggle(index)}
                >
                  {renderIcon(board[index])}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* tasto per resettare la partita */}
      <button
        onClick={reset}
        className={`px-6 py-3 mt-15 text-[2.5rem] rounded-lg bg-emerald-600/70 hover:bg-emerald-400 ${
          animate ? "animate-bounce" : ""
        }`}
      >
        RESET
      </button>
    </div>
  );
};
