import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

const GameScreen = props => {

  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {    
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert(
        'Liar!', 
        'You know what you did...', 
        [{text: 'Sorry!', style:'cancel'}]
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNum);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <View style={styles.container}>
      <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
          <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
        </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    alignItems:'center',
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:20,
    width:300,
    maxWidth:'80%',
  },
});

export default GameScreen;