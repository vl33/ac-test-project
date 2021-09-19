import React from 'react';
import {StyleSheet, Text} from 'react-native';

const Home = ({labelName}) => {
  const getLabelText = name => {
    switch (name) {
      case 'CANCELED':
        return 'Canceled';
      case 'NEW':
        return 'New';
      case 'BACKLOG':
        return 'Backlog';
      case 'INPROGRESS':
        return 'In progress';
      default:
        return '';
    }
  };

  return <Text style={styles.statusText}>{getLabelText(labelName)}</Text>;
};

const styles = StyleSheet.create({
  statusText: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#373737',
    fontSize: 12,
    opacity: 0.7,
  },
});

export default Home;
