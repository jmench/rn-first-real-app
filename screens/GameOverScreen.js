import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const GameOverScreen = props => {
  return (
    <View style={styles.container}>
      <Card>
        <Text>The opponent guessed your number in</Text>
        <NumberContainer>{props.numGuesses}</NumberContainer>
        <Text>guesses!</Text>
        <Button title='PLAY AGAIN' onPress={props.playAgain}/>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default GameOverScreen;