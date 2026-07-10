import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Player = ({ strength, stamina }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>🎯 Gracz</Text>
      <View style={styles.stats}>
        <Text style={styles.stat}>💪 Siła: <Text style={styles.value}>{strength}</Text></Text>
        <Text style={styles.stat}>❤️ Wytrzymałość: <Text style={styles.value}>{stamina}</Text></Text>
      </View>
      <View style={[styles.healthBar, styles.healthBarBackground]}>
        <View 
          style={[
            styles.healthBar, 
            styles.healthBarFill,
            { width: `${(stamina / 50) * 100}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  stats: {
    alignItems: 'center',
  },
  stat: {
    fontSize: 14,
    marginBottom: 6,
    color: '#34495e',
  },
  value: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  healthBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  healthBarBackground: {
    width: '100%',
    backgroundColor: '#ecf0f1',
    position: 'relative',
  },
  healthBarFill: {
    position: 'absolute',
    backgroundColor: '#27ae60',
    left: 0,
    top: 0,
  },
});

export default Player;