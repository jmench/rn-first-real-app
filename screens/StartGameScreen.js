import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {

  const [enteredValue, setEnteredValue] = useState('');

  const inputNumberHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  };

  return (
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
            <Button title='RESET' onPress={() => {}} color={Colors.accent}/>
          </View>
          <View style={styles.button}>
            <Button title='ENTER' onPress={() => {}} color={Colors.primary}/>
          </View>
        </View>
      </Card>
    </View>
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
})

export default StartGameScreen
