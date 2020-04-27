import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputNumberHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert(
        'Invalid number!', 
        'Number must have value from 1 - 99.', 
        [{text: 'Okay', style:'destructive', onPress: resetInputHandler}]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNum);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput =
    <Card style={styles.confirmedOutputContainer}>
      <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)} />
    </Card>
  }

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}} >
      <View style={styles.container}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input 
            style={styles.inputBox}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
            onChangeText={inputNumberHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title='RESET' onPress={resetInputHandler} color={Colors.accent}/>
            </View>
            <View style={styles.button}>
              <Button title='ENTER' onPress={confirmInputHandler} color={Colors.primary}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
    alignItems:'center'
  },
  title: {
    fontSize:20,
    marginVertical:10,
  },
  inputContainer: {
    width:300,
    maxWidth:'80%',
    justifyContent:'center',
    alignItems:'center',
  },
  inputBox: {
    width:50,
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection:'row',
    width:'100%',
    paddingHorizontal:5,
    justifyContent:'space-between',
    alignItems:'center',
  },
  button: {
    width:'40%',
  },
  confirmedOutputContainer: {
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
})

export default StartGameScreen
