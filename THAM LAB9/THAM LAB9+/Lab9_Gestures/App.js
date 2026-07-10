import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function App() {
  const secretSequence = [0, 2, 1]; // Sekretna sekwencja
  const [userSequence, setUserSequence] = useState([]);
  const [hint, setHint] = useState('');
  const [isLockOpen, setIsLockOpen] = useState(false);

  // Współrzędne punktów
  const points = [
    { id: 0, x: 80, y: 120 },
    { id: 1, x: 220, y: 180 },
    { id: 2, x: 150, y: 250 },
  ];

  // Obsługa dotknięcia punktu
  const handlePointTap = (pointId) => {
    if (isLockOpen) return; // Jeśli już otwarte – ignoruj

    const newSequence = [...userSequence, pointId];
    setUserSequence(newSequence);

    const isCorrectSoFar = newSequence.every((value, index) => value === secretSequence[index]);

    if (!isCorrectSoFar) {
      // Błędne dotknięcie
      setUserSequence([]);
      Alert.alert('Niepowodzenie', 'Nie udało się otworzyć zamka! Spróbuj ponownie.');
      setHint('Błędna sekwencja! Zacznij od nowa.');
      return;
    }

    // Jeśli sekwencja pełna i prawidłowa
    if (newSequence.length === secretSequence.length) {
      setIsLockOpen(true);
      Alert.alert('Sukces!', 'Zamek został otwarty! 🎉');
      setHint('Drzwi otwarte! Skarb jest twój!');
    } else {
      const nextStep = secretSequence[newSequence.length];
      setHint(`Dobrze! Następny: dotknij punkt ${nextStep + 1}`);
    }
  };

  // Reset gry
  const resetGame = () => {
    setUserSequence([]);
    setHint('');
    setIsLockOpen(false);
  };

  // Tworzenie gestów dla każdego punktu
  const pointGestures = points.map((point) =>
    Gesture.Tap()
      .maxDuration(250)
      .onStart(() => handlePointTap(point.id))
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Widzisz przed sobą zamknięte drzwi. Spróbuj otworzyć zamek!!
        </Text>
        <Text style={[styles.hintText, isLockOpen && styles.successText]}>
          {hint || (isLockOpen ? 'Zamek otwarty! 🎉' : 'Dotknij punkty we właściwej kolejności')}
        </Text>
        <Text style={styles.sequenceText}>
          Twoje dotknięcia: {userSequence.map(id => id + 1).join(' → ') || 'Brak'}
        </Text>

        {/* Obszar układanki */}
        <View style={styles.puzzleArea}>
          <Image
            source={require('./assets/door.png')}
            style={[styles.image, isLockOpen && styles.doorOpen]}
            resizeMode="contain"
          />

          {/* Punkty do dotykania */}
          {points.map((point, index) => (
            <GestureDetector key={point.id} gesture={pointGestures[index]}>
              <View
                style={[
                  styles.point,
                  { left: point.x, top: point.y },
                  userSequence.includes(point.id) && styles.pointTapped,
                  isLockOpen && styles.pointDisabled,
                ]}
              >
                <Text style={styles.pointText}>{point.id + 1}</Text>
              </View>
            </GestureDetector>
          ))}
        </View>

        {/* Przycisk resetu */}
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Resetuj grę</Text>
        </TouchableOpacity>

        {/* Status zamka */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, isLockOpen ? styles.statusOpen : styles.statusClosed]} />
          <Text style={styles.statusText}>
            {isLockOpen ? 'Zamek: OTWARTY' : 'Zamek: ZAMKNIĘTY'}
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  hintText: {
    color: '#ffcc00',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  sequenceText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  puzzleArea: {
    width: 300,
    height: 300,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  doorOpen: {
    opacity: 0.7,
    tintColor: '#4caf50',
  },
  point: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  pointTapped: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
  },
  pointDisabled: {
    opacity: 0.3,
  },
  pointText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff5722',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  statusOpen: {
    backgroundColor: '#4caf50',
  },
  statusClosed: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
  },
});