import React, { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SendAndArchiveIcon from '@mui/icons-material/SendAndArchive';
import {
  Box,
  ButtonGroup,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ResetTvIcon from '@mui/icons-material/ResetTv';
import BorderClearIcon from '@mui/icons-material/BorderClear';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import PlayerArea from './PlayerArea';
import './App.css';
import Card from './Card';
import sortPokerCards from './utils';

// const initialGameState = {
//   players: [
//     { id: 0, cards: ['2C', '3D', '4H', '5S'] }, // Example initial cards
//     { id: 1, cards: ['6C', '7D', '8H', '9S'] },
//     { id: 2, cards: ['10C', 'JD', 'QH', 'KS'] },
//     { id: 3, cards: ['AC', '2D', '3H', '4S'] },
//   ],
// "tributes": [
//   { "from" : 0, "to": 3, card: '2C' }
// ],
// "antiTributes": [
//   {"from": 0, "reason": ""}
// ],
//   playedCards: [
//     { player: 0, cards: ['2C', '4H'] },
//     { player: 1, cards: ['6C'] },
//     { player: 2, cards: ['10C', 'QH'] },
//     { player: 3, cards: ['AC', '3H'] },
//   ],
// };

const dummyData = {
  players: [
    { id: 0, cards: [] }, // Example initial cards
    { id: 1, cards: [] },
    { id: 2, cards: [] },
    { id: 3, cards: [] },
  ],
  tributes: [],
  antiTributes: [],
  playedCards: [],
};

function App() {
  const [initialGameState, setInitialGameState] = useState(dummyData);
  const [gameState, setGameState] = useState(dummyData);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [centerCards, setCenterCards] = useState([]);
  const [playerPositions, setPlayerPositions] = useState([0, 1, 2, 3]);
  const [showAllFace, setShowAllFace] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [assetsPath, setAssetsPath] = useState('');

  useEffect(() => {
    async function t() {
      const p = await window.electron.ipcRenderer.getAssetsPath();
      console.log(p);
      setAssetsPath(p);
    }
    t();
  }, []);

  const playCard = () => {
    const currentAction = gameState.playedCards[currentActionIndex];
    if (currentAction) {
      setCenterCards(currentAction.cards);
      setCurrentPlayer(currentAction.player);

      // Update the player's cards
      const updatedPlayers = gameState.players.map((player, index) => {
        if (index === currentAction.player) {
          // Create a copy of the player's cards
          const playerCards = [...player.cards];

          // Remove the first occurrence of each card in currentAction.cards
          currentAction.cards.forEach((actionCard) => {
            const cardIndex = playerCards.indexOf(actionCard);
            if (cardIndex !== -1) {
              playerCards.splice(cardIndex, 1);
            }
          });

          return {
            ...player,
            cards: playerCards,
          };
        }
        return player;
      });

      // Move to the next action
      setGameState({
        ...gameState,
        players: updatedPlayers,
      });

      setCurrentActionIndex(
        (prevIndex) => (prevIndex + 1) % gameState.playedCards.length,
      );
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setCurrentActionIndex(0);
    setCenterCards([]);
    setCurrentPlayer(-1);
    setPlayerPositions([0, 1, 2, 3]); // Reset positions
  };

  const rotatePlayers = () => {
    setPlayerPositions((prevPositions) => {
      const newPositions = prevPositions.map((position) => (position + 1) % 4);
      return newPositions;
    });
  };

  const showCardFace = () => {
    setShowAllFace(!showAllFace);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          const newGameState = JSON.parse(content);
          newGameState.players.forEach((m) => {
            m.cards = sortPokerCards(m.cards);
          });
          if (newGameState.tributes.length > 0) {
            newGameState.tributes.forEach((m) => {
              let { cards } = newGameState.players[m.from];
              const index = cards.indexOf(m.card);
              cards.splice(index, 1);
              cards = newGameState.players[m.to].cards;
              cards.push(m.card);
            });
          }
          setGameState(newGameState);

          setInitialGameState(newGameState);
          setCurrentActionIndex(0);
          setCenterCards([]);
          setPlayerPositions([0, 1, 2, 3]); // Reset positions
        } catch (error) {
          console.error('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      {gameState.tributes.length > 0 && (
        <Paper
          sx={{ width: '100%', margin: '2px', padding: '2px' }}
          elevation={3}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>进贡</Typography>
            </Grid>
            <Grid item>
              {gameState.tributes.map((tribute, index) => (
                <Typography>
                  From P{tribute.from} To P{tribute.to} {tribute.card}
                  <img
                    src={`${assetsPath}/cards/${tribute.card}.svg`}
                    style={{ width: '16px', height: '28px' }}
                  />
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Paper>
      )}
      {gameState.antiTributes.length > 0 && (
        <Paper
          sx={{ width: '100%', margin: '2px', padding: '2px' }}
          elevation={3}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>抗贡</Typography>
            </Grid>
            <Grid item>
              <Typography>
                From {gameState.antiTributes[0].from} Reason{' '}
                {gameState.antiTributes[0].reason}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      <div className="table">
        {playerPositions.map((position, index) => (
          <PlayerArea
            key={gameState.players[index].id}
            player={gameState.players[index]}
            position={position}
            assetsPath={assetsPath}
            currentPlayer={currentPlayer}
            showAllCards={showAllFace || position === 2} // Only show cards face-up for the bottom player
          />
        ))}
        <div className="played-cards">
          {centerCards.map((card, index) => (
            <Card
              key={index}
              card={card}
              assetsPath={assetsPath}
              isFaceUp
              rotate={false}
            />
          ))}
        </div>
      </div>
      <Paper
        sx={{ width: '100%', margin: '10px', padding: '10px' }}
        elevation={3}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <ButtonGroup aria-label="control group">
              <input type="file" accept=".json" onChange={handleFileChange} />
            </ButtonGroup>
          </Grid>
          <Grid item>
            <ButtonGroup aria-label="control group">
              <Tooltip title="下一步">
                <IconButton color="primary" onClick={playCard}>
                  <PlayCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="清空桌面">
                <IconButton color="primary" onClick={() => setCenterCards([])}>
                  <BorderClearIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="重置游戏">
                <IconButton color="primary" onClick={resetGame}>
                  <ResetTvIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="轮转排位">
                <IconButton color="primary" onClick={rotatePlayers}>
                  <CropRotateIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="明牌">
                <IconButton color="primary" onClick={showCardFace}>
                  <FaceRetouchingNaturalIcon />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
