import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ timeLeft, totalTime }) => {
  const progress = (timeLeft / totalTime) * 100;
  
  const getTimerColor = () => {
    if (progress > 50) return '#4CAF50';
    if (progress > 25) return '#FF9800';
    return '#F44336';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{timeLeft}s</Text>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress}%`, backgroundColor: getTimerColor() }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  progressBar: {
    width: 200,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
});

export default Timer;