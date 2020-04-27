import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);

  const configureNewGameHandler = () => {
    setNumGuesses(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = (guesses) => {
    setNumGuesses(guesses)
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && numGuesses <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (numGuesses > 0) {
    content = <GameOverScreen numGuesses={numGuesses} playAgain={configureNewGameHandler} />
  }

  return (
    <View style={styles.container}>
      <Header title='Guess A Number' />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
