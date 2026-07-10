import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import PuzzleScreen from './components/PuzzleScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <PuzzleScreen />
    </SafeAreaView>
  );
}