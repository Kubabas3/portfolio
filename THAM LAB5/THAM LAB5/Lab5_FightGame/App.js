import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import Player from './components/Player';
import Enemy from './components/Enemy';
import BattleLog from './components/BattleLog';
import { calculateDamage, getRandomEnemy, getEnemyStrength } from './utils/battleLogic';
import { getEnemyStamina } from './utils/enemyData';

const App = () => {
  const [gameState, setGameState] = useState('playing');
  const [enemyType, setEnemyType] = useState(getRandomEnemy());
  const [playerStamina, setPlayerStamina] = useState(50);
  const [enemyStamina, setEnemyStamina] = useState(getEnemyStamina(enemyType));
  const [round, setRound] = useState(1);
  const [battleLog, setBattleLog] = useState([]);

  const playerStrength = 10;
  const enemyStrength = getEnemyStrength(enemyType);

  const handleAttack = () => {
  if (gameState !== 'playing') return;

 
  const playerDamage = calculateDamage(playerStrength);
  const newEnemyStamina = enemyStamina - playerDamage;
  setEnemyStamina(newEnemyStamina);

  
  const enemyDamage = calculateDamage(enemyStrength);
  const newPlayerStamina = playerStamina - enemyDamage;
  setPlayerStamina(newPlayerStamina);

  const newLogEntry = {
    round,
    playerDamage,
    enemyDamage,
    playerStamina: newPlayerStamina
  };
  setBattleLog(prev => [newLogEntry, ...prev]);

  const playerDefeated = newPlayerStamina <= 0;
  const enemyDefeated = newEnemyStamina <= 0;

  if (playerDefeated && enemyDefeated) {
    setGameState('draw');
    Alert.alert('Remis!', 'Oboje polegliście w walce...');
    return;
  }

  if (playerDefeated) {
    setGameState('defeat');
    Alert.alert('Porażka!', 'Twój bohater zginął...');
    return;
  }

  if (enemyDefeated) {
    setGameState('victory');
    Alert.alert('Zwycięstwo!', 'Pokonałeś przeciwnika!');
    return;
  }

  setRound(round + 1);

  Alert.alert(
    `Runda ${round}`,
    `⚔️ Zadałeś ${playerDamage} obrażeń!\n🛡️ Otrzymałeś ${enemyDamage} obrażeń!`
  );
};

  const restartGame = () => {
  const newEnemyType = getRandomEnemy();
  setGameState('playing');
  setEnemyType(newEnemyType);
  setPlayerStamina(50);
  setEnemyStamina(getEnemyStamina(newEnemyType));
  setRound(1);
  setBattleLog([]);
};

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>⚔️ Walka Fantasy - Runda {round}</Text>
        
        <View style={styles.charactersContainer}>
          <Player strength={playerStrength} stamina={playerStamina} />
          <Enemy strength={enemyStrength} type={enemyType} stamina={enemyStamina} />
        </View>

        <BattleLog log={battleLog} />
        
        {gameState === 'playing' ? (
  <View style={styles.buttonContainer}>
    <Button 
      title="🎯 Wykonaj cios" 
      onPress={handleAttack}
      color="#e74c3c"
    />
  </View>
) : (
  <View style={styles.restartContainer}>
    <Text style={[
      styles.result,
      { 
        color: gameState === 'victory' ? '#27ae60' 
              : gameState === 'defeat' ? '#e74c3c' 
              : '#f39c12' // оранжевый для ничьей
      }
    ]}>
      {gameState === 'victory' ? '🎉 Zwycięstwo!' 
       : gameState === 'defeat' ? '💀 Porażka...' 
       : '⚖️ Remis!'}
    </Text>
    <View style={styles.buttonContainer}>
      <Button 
        title="🔄 Nowa gra" 
        onPress={restartGame}
        color="#3498db"
      />
    </View>
  </View>
)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    justifyContent: 'center', // ← ДОБАВЛЯЕМ ЭТУ СТРОЧКУ
  },
  container: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  charactersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  restartContainer: {
    alignItems: 'center',
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default App;