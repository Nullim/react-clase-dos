import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onSquareClick = () => {} }) => {
  return (
    <div onClick={onSquareClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [gameEnded, setGameEnded] = useState(false);

  const setTileTo = (tileIndex) => {
    if (tiles[tileIndex] !== "" || gameEnded) {
      return;
    }
    const newTiles = [...tiles];
    newTiles[tileIndex] = currentPlayer;
    setTiles(newTiles)
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    const winner = getWinner(newTiles)
    if (winner) {
      setGameEnded(true);
    } else if (newTiles.every(tile => tile !== "")){
      setGameEnded(true)
      return false;
    }
  };
  const restart = () => {
    setGameEnded(false);
    setTiles(Array(9).fill(""));
    setCurrentPlayer('X');
  };
  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner: getWinner(tiles), gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">
      {!gameEnded && <div className='status'>Next player is: {currentPlayer}</div>}
      <WinnerCard winner={winner} onRestart={restart} show={gameEnded}/>
      <div className='tictactoe-row'>
        <Square value={tiles[0]} onSquareClick={() => setTileTo(0)}/>
        <Square value={tiles[1]} onSquareClick={() => setTileTo(1)}/>
        <Square value={tiles[2]} onSquareClick={() => setTileTo(2)}/>
      </div>
      <div className='tictactoe-row'>
        <Square value={tiles[3]} onSquareClick={() => setTileTo(3)}/>
        <Square value={tiles[4]} onSquareClick={() => setTileTo(4)}/>
        <Square value={tiles[5]} onSquareClick={() => setTileTo(5)}/>
      </div>
      <div className='tictactoe-row'>
        <Square value={tiles[6]} onSquareClick={() => setTileTo(6)}/>
        <Square value={tiles[7]} onSquareClick={() => setTileTo(7)}/>
        <Square value={tiles[8]} onSquareClick={() => setTileTo(8)}/>
      </div>
    </div>
  );
};
export default TicTacToe;
