import React from 'react';
import { deepOrange, green } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import Card from './Card';
import './PlayerArea.css';


function PlayerArea({ player, position, currentPlayer, showAllCards, assetsPath }) {
  const rotate = position === 1 || position === 3; // Rotate for right and left players
  const applyOverlap = rotate && player.cards.length > 6;

  return (
    <div className={`player-area position-${position}  `}>
      <Avatar sx={{ bgcolor: currentPlayer === player.id ? green[100] : deepOrange[500] }}>P{player.id}</Avatar>
      <div
        className={`cards-container ${rotate ? 'column' : 'row'} ${applyOverlap ? 'overlap' : ''}`}
      >
        {player.cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            assetsPath={assetsPath}
            isFaceUp={showAllCards}
            rotate={rotate}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayerArea;
