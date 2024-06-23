// import Square from "./Square";
import { useState } from 'react';
import './Tictactoe.css'
function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);

  let isWinner = false;
  let winner = null;
  let info = `Ходит - ${(isNextX) ? 'x' : 'o'}`;

  const checkWinner = () => {
    const winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];
    for(let combination of winnerCombinations){
      let [a, b, c] = combination;
      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        isWinner = true;
        return squares[a];
      }
    }
    return null;
  }

  const reload=()=>{
    window.location.reload();
  }

  const setSquareValue = (i) => {
    if(isWinner) {
      window.location.reload();
      return;
    }
    if(squares[i]) return;
    let newSquares = squares.slice();
    newSquares[i] = (isNextX) ? 'x' : 'o';
    setIsNextX(!isNextX);
    setSquares(newSquares);
  }

  winner = checkWinner();
  if(winner) info = `Победил - ${winner}`;

  return (
      <div>
        <h1>{info}
          <h1> </h1>
          <button className='buttonReload' onClick={reload}> Перезапуск</button>
        </h1>

        {squares.map((square, index) => {
          return (
              <span key={index}>
            <Square value={square} setSquareValue={() => setSquareValue(index)}/>
                {(index === 2 || index === 5) && <br/>}
          </span>
          );
        })}
      </div>
  )
}
function Square({ value, setSquareValue}) {
  return (
      <button
          className='buttonXO'
          onClick={setSquareValue}
          style={{
            color: value ? '#61dafb' : '#282c34',
          }}
      >
        {value || '-'}
      </button>
  );
}

export default Board;