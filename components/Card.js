import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const Card = props => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
};

const styles= StyleSheet.create({
  card: {
    alignItems:'center',
    shadowColor:Colors.accent,
    shadowOffset: {width:0, height:2},
    shadowOpacity:0.56,
    shadowRadius:5,
    elevation:5,
    backgroundColor:'white',
    padding:20,
    borderRadius:10,
  },
});

export default Card;