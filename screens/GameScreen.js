import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import AwesomeButton from "react-native-really-awesome-button";
import Color from '../constants/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
      <Card style={styles.guessContainer}>
        <Text>The Opponent's Guess is...</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Text>Is your number...</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <AwesomeButton
              primary
              stretch
              onPress={nextGuessHandler.bind(this, 'lower')}
            >
              LOWER 
            </AwesomeButton>
          </View>
          <View style={styles.button}>
            <AwesomeButton
              primary
              stretch
              onPress={nextGuessHandler.bind(this, 'greater')}
            >
              GREATER 
            </AwesomeButton>
          </View>
        </View>
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
  guessContainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10,
    width:300,
    maxWidth:'80%',
  },
  button: {
    width:'45%',
  },
});

export default GameScreen;