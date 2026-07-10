// src/components/ShakeControl.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ShakeControl({ onTestShake, onClearCompleted }) {
  const [threshold, setThreshold] = useState(1.8);

  const handleClear = () => {
    Alert.alert(
      'Usunąć ukończone?',
      'Czy chcesz usunąć wszystkie ukończone zadania?',
      [
        { text: 'Nie', style: 'cancel' },
        { text: 'Tak', onPress: onClearCompleted }
      ]
    );
  };

  const thresholds = [
    { value: 1.2, label: 'Wysoka', desc: 'Łatwo aktywuje' },
    { value: 1.8, label: 'Średnia', desc: 'Normalna czułość' },
    { value: 2.5, label: 'Niska', desc: 'Trzeba mocniej' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Wykrywanie Wstrząsów</Text>
      
      <Text style={styles.label}>Czułość wykrywania:</Text>
      
      <View style={styles.buttons}>
        {thresholds.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.button,
              threshold === item.value && styles.buttonActive
            ]}
            onPress={() => setThreshold(item.value)}
          >
            <Text style={[
              styles.buttonText,
              threshold === item.value && styles.buttonTextActive
            ]}>
              {item.label}
            </Text>
            <Text style={styles.buttonDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.info}>
        Potrząśnij telefonem (F {threshold.toFixed(1)}) aby usunąć ukończone zadania.
        Wzór: F = √(x² + y² + z²)
      </Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={onTestShake}>
          <Text style={styles.actionButtonText}>🧪 Test Wstrząsu</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.clearButton]}
          onPress={handleClear}
        >
          <Text style={styles.actionButtonText}>🗑️ Wyczyść Ręcznie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f3460',
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    color: '#b8b8b8',
    fontSize: 16,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#e94560',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: '#fff',
  },
  buttonDesc: {
    color: '#888',
    fontSize: 10,
    marginTop: 4,
  },
  info: {
    color: '#4ecdc4',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4ecdc4',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#e94560',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});