// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import InfoScreen from './src/screens/InfoScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <InfoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});