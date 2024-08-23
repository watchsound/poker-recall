import React from 'react';
import './Card.css';

function Card({ card, isFaceUp, assetsPath, rotate }) {

  const cardSrc = isFaceUp
    ? `${assetsPath}/cards/${card}.svg`
    : `${assetsPath}/cards/back.svg`;
  return (
    <img
      src={cardSrc}
      alt={card}
      className={`card ${rotate ? 'rotate' : ''}`}
    />
  );
}

export default Card;
