import { React, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const Game = () => {
  const [matches, setMatches] = useState(25);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [log, setLog] = useState([]);

  const handleTakeMatches = (numMatches) => {
    if (playerTurn && matches > 0) {
      if (numMatches >= 1 && numMatches <= 3 && numMatches <= matches) {
        const updatedMatches = matches - numMatches;
        setMatches(updatedMatches);

        const logMessage = `You subtracted ${numMatches} match(es). New total: ${updatedMatches}`;
        setLog([...log, logMessage]);

        if (updatedMatches === 0) {
          const playerWon = numMatches % 2 === 0;
          if (playerWon) {
            alert('Congratulations! You won!');
          } else {
            alert('You lost. Better luck next time!');
          }
        } else {
          setPlayerTurn(false);
          setTimeout(makeAIMove, 500, updatedMatches);
        }
      } else {
        alert('Invalid number of matches.');
      }
    }
  };

  const makeAIMove = (remainingMatches) => {
    let aiMatches = 1;

    if (remainingMatches > 1) {
      if (remainingMatches <= 4) {
        aiMatches = remainingMatches - 1;
      } else if (remainingMatches % 4 === 0) {
        aiMatches = Math.floor(Math.random() * 3) + 1;        // If the remaining matches are divisible by 4, the AI selects a random number between 1 and 3.
      } else {
        aiMatches = remainingMatches % 4;
      }
    }   

    const updatedMatches = remainingMatches - aiMatches;
    setMatches(updatedMatches);

    const logMessage = `AI subtracted ${aiMatches} match(es). New total: ${updatedMatches}`;
    setLog([...log, logMessage]);

    if (updatedMatches === 0) {
      const playerWon = aiMatches % 2 === 0;
      if (playerWon) {
        alert('Congratulations! You won!');
      } else {
        alert('You lost. Better luck next time!');
      }
    } else {
      setPlayerTurn(true);
    }
  };

  const handleResetGame = () => {
    setMatches(25);
    setPlayerTurn(true);
    setLog([]);
  };

  return (
    <>
      <Box sx={{textAlign: "center"}}>
        <Typography 
          mt={10} 
          sx={{
            fontStyle: "normal", 
            fontWeight: "700", 
            fontSize: "30px", 
            lineHeight: "40px"
          }}
        >
          Matches game with AI
        </Typography>
        <Typography
          mt={5}
          mb={2}
          sx={{
            fontStyle: "normal", 
            fontSize: "20px", 
            lineHeight: "30px"
          }}
        >
          Matches remaining: <b>{matches}</b>
        </Typography>
        {playerTurn ? (
          <Typography
            mb={1}
          >
            Your turn. Select the number of matches to take:
          </Typography>
        ) : (
          <Typography>AI's turn. Please wait...</Typography>
        )}
        {matches > 0 && playerTurn ? (
          <Stack 
            direction="row" 
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Button 
              variant="contained"
              size="medium"
              onClick={() => handleTakeMatches(1)}
            >
              Take 1 match
            </Button>
            <Button 
              variant="contained"
              size="medium"
              onClick={() => handleTakeMatches(2)}
            >
              Take 2 matches
            </Button>
            <Button 
              variant="contained"
              size="medium"
              onClick={() => handleTakeMatches(3)}
            >
              Take 3 matches
            </Button>
          </Stack>
        ) : null}
        {matches === 0 ? (
          <Button variant="contained" size="medium" onClick={handleResetGame} sx={{ marginTop: "10px"}}>
            Reset Game
          </Button>
        ) : null}
        {log.length > 0 && (
          <Box mt={5} sx={{ textAlign: 'left' }}>
            <Typography variant="h6">Game Log:</Typography>
            {log.map((message, index) => (
              <Typography key={index} component="p">
                {message}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Game;
