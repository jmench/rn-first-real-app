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
import AwesomeButton from "react-native-really-awesome-button";
import Colors from '../constants/colors';
import Input from '../components/Input';
import colors from '../constants/colors';

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
              <AwesomeButton
                primary
                stretch
                textColor={Colors.accent}
                borderColor={Colors.accent}
                backgroundDarker={Colors.primary}
                backgroundShadow={Colors.accent}
                borderWidth={1}
                backgroundColor='white'
                onPress={resetInputHandler}
              >
                RESET 
              </AwesomeButton>
            </View>
            <View style={styles.button}>
              <AwesomeButton
                primary
                stretch
                textColor={Colors.primary}
                borderColor={Colors.primary}
                backgroundDarker={Colors.accent}
                backgroundShadow={Colors.primary}
                borderWidth={1}
                backgroundColor='white'
                onPress={confirmInputHandler}
              >
                ENTER 
              </AwesomeButton>
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
    marginTop:5
  },
  button: {
    width:'45%',
  },
  confirmedOutputContainer: {
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
})

export default StartGameScreen
