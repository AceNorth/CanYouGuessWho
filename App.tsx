import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GuessWhoGame} from './screens/GuessWhoGame/GuessWhoGame';

export const App = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <GuessWhoGame />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flex: 1,
  },
});

export default App;
