import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const BattleLog = ({ log }) => {
  if (log.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Historia walki:</Text>
        <Text style={styles.empty}>Walka się jeszcze nie rozpoczęła</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historia walki:</Text>
      <ScrollView style={styles.scrollView}>
        {log.map((entry, index) => (
          <View key={index} style={styles.logEntry}>
            <Text style={styles.round}>Runda {entry.round}</Text>
            <Text style={styles.damage}>⚔️ Zadałeś: {entry.playerDamage} obrażeń</Text>
            <Text style={styles.damage}>🛡️ Otrzymałeś: {entry.enemyDamage} obrażeń</Text>
            <Text style={styles.stamina}>❤️ Twoja wytrzymałość: {entry.playerStamina}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  scrollView: {
    maxHeight: 120,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logEntry: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  round: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  damage: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  stamina: {
    fontSize: 12,
    fontWeight: '600',
    color: '#27ae60',
  },
  empty: {
    fontSize: 14,
    color: '#95a5a6',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default BattleLog;