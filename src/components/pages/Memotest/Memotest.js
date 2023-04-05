import React from 'react';
import cx from 'classnames';
import questionmark from './images/questionmark.jpg'
import './Memotest.css';
import useMemotestStateGame from './useMemotestStateGame';
import FancyButton from '../../small/FancyButton';

const WinnerCard = ({ show, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        The game has ended.
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

const Carta = ({ src, name, flipped, onClick }) => {
    return (
        <div onClick={onClick} className="memotest-img-wrapper"> 
            <img 
                className={cx("memotest-img", {'memotest-img--flipped': flipped})}
                src={flipped ? src : questionmark}
                alt={name} 
                draggable={false}
            />
        </div>
    );
}

const Memotest = () => {

    const { cartas, flipped, onRestart, onClickCard, gameEnded, wonPairs } = useMemotestStateGame();

    return (
        <div className="memotest-wrapper">
            <WinnerCard show={gameEnded} onRestart={onRestart}/>
            {cartas.map(({key, name, src}) => (
                <Carta 
                    key={key} 
                    name={name} 
                    src={src} 
                    onClick={() => onClickCard(key)} 
                    flipped={wonPairs.includes(name) || flipped.includes(key)}
                />
            ))}
        </div>
    );
};

export default Memotest
