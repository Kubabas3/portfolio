import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, ActivityIndicator } from 'react-native';
import Player from './components/Player';
import Enemy from './components/Enemy';
import BattleLog from './components/BattleLog';
import { calculateDamage } from './utils/battleLogic';
import { api } from './utils/api';

const App = () => {
  const [gameState, setGameState] = useState('loading');
  const [enemyType, setEnemyType] = useState('');
  const [enemyStrength, setEnemyStrength] = useState(0);
  const [enemyStamina, setEnemyStamina] = useState(0);
  const [playerStamina, setPlayerStamina] = useState(50);
  const [playerStrength, setPlayerStrength] = useState(10);
  const [round, setRound] = useState(1);
  const [battleLog, setBattleLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [webSocket, setWebSocket] = useState(null);
  const [randomEvent, setRandomEvent] = useState(null);
  const [webSocketStatus, setWebSocketStatus] = useState('disconnected');

  const webSocketRef = useRef(null);

  // Загрузка данных врага при монтировании компонента
  useEffect(() => {
    loadEnemyData();
    
    // Очистка WebSocket при размонтировании
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  const loadEnemyData = async () => {
    try {
      setLoading(true);
      const enemyData = await api.fetchRandomEnemy();
      
      setEnemyType(enemyData.type);
      setEnemyStrength(enemyData.strength);
      setEnemyStamina(enemyData.stamina);
      
      setGameState('playing');
      setLoading(false);
      
      // Подключаем WebSocket после загрузки данных
      connectWebSocket();
      
    } catch (error) {
      console.error('Error loading enemy data:', error);
      Alert.alert('Błąd', 'Nie udało się załadować danych przeciwnika');
      setLoading(false);
    }
  };

  const connectWebSocket = () => {
    const ws = api.connectWebSocket(
      // Обработчик входящих сообщений
      (event) => {
        console.log('🛰 WebSocket: Event received:', event);
        if (event && gameState === 'playing') {
          setRandomEvent(event);
          handleRandomEvent(event);
        }
      },
      // Обработчик ошибок
      (error) => {
        console.error('🛰 WebSocket: Error:', error);
        setWebSocketStatus('error');
      }
    );
    
    webSocketRef.current = ws;
    setWebSocket(ws);
    setWebSocketStatus('connected');
  };

  const handleRandomEvent = (event) => {
    if (gameState !== 'playing') return;
    
    let message = event.message;
    
    switch (event.type) {
      case 'power_boost':
        setEnemyStrength(prev => prev + event.value);
        break;
      case 'stamina_boost':
        setEnemyStamina(prev => prev + event.value);
        break;
      case 'heal':
        setEnemyStamina(prev => prev + event.value);
        break;
      case 'player_boost':
        setPlayerStrength(prev => prev + event.value);
        break;
      case 'player_heal':
        setPlayerStamina(prev => Math.min(50, prev + event.value));
        break;
      default:
        return;
    }
    
    Alert.alert('💫 Zdarzenie losowe!', message);
    
    // Очищаем событие через 3 секунды
    setTimeout(() => setRandomEvent(null), 3000);
  };

  const handleAttack = () => {
    if (gameState !== 'playing') return;

    // Игрок атакует врага
    const playerDamage = calculateDamage(playerStrength);
    const newEnemyStamina = enemyStamina - playerDamage;
    setEnemyStamina(newEnemyStamina);

    // Враг атакует игрока
    const enemyDamage = calculateDamage(enemyStrength);
    const newPlayerStamina = playerStamina - enemyDamage;
    setPlayerStamina(newPlayerStamina);

    // Добавляем запись в лог
    const newLogEntry = {
      round,
      playerDamage,
      enemyDamage,
      playerStamina: newPlayerStamina
    };
    setBattleLog(prev => [newLogEntry, ...prev]);

    // Проверяем условия окончания игры
    const playerDefeated = newPlayerStamina <= 0;
    const enemyDefeated = newEnemyStamina <= 0;

    if (playerDefeated && enemyDefeated) {
      setGameState('draw');
      Alert.alert('Remis!', 'Oboje polegliście w walce...');
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      return;
    }

    if (playerDefeated) {
      setGameState('defeat');
      Alert.alert('Porażka!', 'Twój bohater zginął...');
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      return;
    }

    if (enemyDefeated) {
      setGameState('victory');
      Alert.alert('Zwycięstwo!', 'Pokonałeś przeciwnika!');
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      return;
    }

    setRound(round + 1);

    Alert.alert(
      `Runda ${round}`,
      `⚔️ Zadałeś ${playerDamage} obrażeń!\n🛡️ Otrzymałeś ${enemyDamage} obrażeń!`
    );
  };

  const restartGame = () => {
    // Закрываем предыдущее WebSocket соединение
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    
    // Сбрасываем состояние
    setGameState('loading');
    setPlayerStamina(50);
    setPlayerStrength(10);
    setRound(1);
    setBattleLog([]);
    setRandomEvent(null);
    setWebSocketStatus('disconnected');
    
    // Загружаем нового врага
    loadEnemyData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Ładowanie danych przeciwnika...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>⚔️ Walka Fantasy - Runda {round}</Text>
        
        {/* Показываем случайное событие */}
        {randomEvent && (
          <View style={styles.eventBanner}>
            <Text style={styles.eventText}>💫 {randomEvent.message}</Text>
          </View>
        )}
        
        <View style={styles.charactersContainer}>
          <Player strength={playerStrength} stamina={playerStamina} />
          <Enemy strength={enemyStrength} type={enemyType} stamina={enemyStamina} />
        </View>

        <Text style={styles.connectionInfo}>
          🌐 Dane z serwera | 🛰 WebSocket: {webSocketStatus === 'connected' ? 'Połączono' : 'Brak połączenia'}
        </Text>

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
                      : '#f39c12'
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
    paddingVertical: 20,
    justifyContent: 'center',
  },
  container: {
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
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
  connectionInfo: {
    textAlign: 'center',
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  eventBanner: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    marginBottom: 15,
  },
  eventText: {
    color: '#856404',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;