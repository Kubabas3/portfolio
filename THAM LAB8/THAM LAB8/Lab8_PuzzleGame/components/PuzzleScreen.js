import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Animated
} from 'react-native';
import useOrientation from '../hooks/useOrientation';
import useTimer from '../hooks/useTimer';
import Timer from './Timer';
import { puzzles, TIME_LIMIT } from '../constants/puzzles';

const PuzzleScreen = () => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, success, failure, timeup
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [resultType, setResultType] = useState(''); // 'success' или 'failure'

  const orientation = useOrientation();
  const { timeLeft, isRunning, startTimer, resetTimer } = useTimer(TIME_LIMIT, handleTimeUp);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const currentPuzzle = puzzles[currentPuzzleIndex];

  useEffect(() => {
    // При смене загадки скрываем результат
    hideResult();
    startTimer();
  }, [currentPuzzleIndex]);

  function handleTimeUp() {
    setGameStatus('timeup');
    showResultMessage('Czas minął!', 'failure');
    setTimeout(() => {
      Alert.alert('Czas minął!', `Poprawna odpowiedź to: ${currentPuzzle.answer}`);
      nextPuzzle();
    }, 1500);
  }

  const showResultMessage = (message, type) => {
    setResultMessage(message);
    setResultType(type);
    setShowResult(true);
    
    // Анимация появления
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideResult = () => {
    // Анимация исчезновения
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowResult(false);
      setResultMessage('');
      setResultType('');
    });
  };

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentPuzzle.answer.toLowerCase()) {
      setGameStatus('success');
      setScore(prev => prev + 10);
      showResultMessage('Brawo! Poprawna odpowiedź!', 'success');
      
      setTimeout(() => {
        nextPuzzle();
      }, 1500);
    } else {
      setGameStatus('failure');
      showResultMessage('Błąd! Niepoprawna odpowiedź.', 'failure');
      
      setTimeout(() => {
        Alert.alert('Błąd!', `Poprawna odpowiedź to: ${currentPuzzle.answer}`);
        nextPuzzle();
      }, 1500);
    }
  };

  const nextPuzzle = () => {
    hideResult();
    resetTimer(TIME_LIMIT);
    setUserAnswer('');
    setGameStatus('playing');
    
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
    } else {
      // Небольшая задержка перед показом финального алерта
      setTimeout(() => {
        Alert.alert('Koniec gry!', `Twój wynik: ${score} punktów`);
        setCurrentPuzzleIndex(0);
        setScore(0);
      }, 500);
    }
  };

  const skipPuzzle = () => {
    hideResult();
    resetTimer(TIME_LIMIT);
    setUserAnswer('');
    nextPuzzle();
  };

  const getLayoutStyle = () => {
    if (orientation === 'LANDSCAPE') {
      return {
        container: styles.landscapeContainer,
        imageContainer: styles.landscapeImageContainer,
        contentContainer: styles.landscapeContentContainer,
      };
    }
    return {
      container: styles.portraitContainer,
      imageContainer: styles.portraitImageContainer,
      contentContainer: styles.portraitContentContainer,
    };
  };

  const layout = getLayoutStyle();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, layout.container]}>
        <View style={styles.header}>
          <Text style={styles.score}>Wynik: {score}</Text>
          <Text style={styles.puzzleCount}>
            Zagadka {currentPuzzleIndex + 1}/{puzzles.length}
          </Text>
        </View>

        <Timer timeLeft={timeLeft} totalTime={TIME_LIMIT} />

        <View style={[styles.content, layout.container]}>
          <View style={[styles.imageSection, layout.imageContainer]}>
            <Image source={{ uri: currentPuzzle.image }} style={styles.image} />
            <Text style={styles.hint}>Podpowiedź: {currentPuzzle.hint}</Text>
          </View>

          <View style={[styles.questionSection, layout.contentContainer]}>
            <Text style={styles.question}>{currentPuzzle.question}</Text>
            
            <TextInput
              style={styles.input}
              value={userAnswer}
              onChangeText={setUserAnswer}
              placeholder="Wpisz swoją odpowiedź..."
              editable={gameStatus === 'playing'}
            />
            
            <View style={styles.buttonsContainer}>
              <Button
                title="Sprawdź"
                onPress={checkAnswer}
                disabled={!userAnswer.trim() || gameStatus !== 'playing'}
                color="#4CAF50"
              />
              <Button
                title="Pomiń"
                onPress={skipPuzzle}
                color="#FF9800"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Анимированное сообщение о результате */}
      {showResult && (
        <Animated.View 
          style={[
            styles.resultOverlay,
            resultType === 'success' ? styles.successOverlay : styles.failureOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <View style={[
            styles.resultContent,
            resultType === 'success' ? styles.successContent : styles.failureContent
          ]}>
            <Text style={styles.resultIcon}>
              {resultType === 'success' ? '✅' : '❌'}
            </Text>
            <Text style={[
              styles.resultText,
              resultType === 'success' ? styles.successText : styles.failureText
            ]}>
              {resultMessage}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    minHeight: '100%',
  },
  portraitContainer: {
    flexDirection: 'column',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  puzzleCount: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  portraitImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  landscapeImageContainer: {
    flex: 1,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portraitContentContainer: {
    flex: 1,
  },
  landscapeContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  hint: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    lineHeight: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    gap: 10,
  },
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successOverlay: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  failureOverlay: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  resultContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    minWidth: 250,
  },
  successContent: {
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50',
  },
  failureContent: {
    borderLeftWidth: 6,
    borderLeftColor: '#F44336',
  },
  resultIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    color: '#4CAF50',
  },
  failureText: {
    color: '#F44336',
  },
});

export default PuzzleScreen;