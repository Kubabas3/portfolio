// src/components/ThemeControl.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

export default function ThemeControl({ isDarkMode, lux, isAvailable, onToggleTheme }) {
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Text style={[styles.title, themeStyles.title]}>💡 Sterowanie Motywem</Text>
      
      <View style={styles.row}>
        <Text style={[styles.label, themeStyles.text]}>Tryb nocny:</Text>
        <Switch
          value={isDarkMode}
          onValueChange={onToggleTheme}
          trackColor={{ false: '#767577', true: '#4ecdc4' }}
          thumbColor={isDarkMode ? '#0f3460' : '#f4f3f4'}
        />
      </View>
      
      {isAvailable ? (
        <View style={styles.sensorInfo}>
          <Text style={[styles.sensorText, themeStyles.text]}>
            Czujnik światła: {lux.toFixed(0)} lux
          </Text>
          <View style={styles.luxBar}>
            <View 
              style={[
                styles.luxFill, 
                { width: `${Math.min(lux, 100)}%` },
                lux < 20 ? styles.luxLow : styles.luxNormal
              ]} 
            />
          </View>
          <Text style={[styles.sensorHint, themeStyles.textSecondary]}>
            {lux < 20 
              ? 'Jasność < 20 lux - tryb nocny włączony' 
              : 'Jasność > 20 lux - tryb dzienny'}
          </Text>
        </View>
      ) : (
        <View style={styles.sensorInfo}>
          <Text style={[styles.sensorText, themeStyles.text]}>
            Czujnik światła niedostępny
          </Text>
          <Text style={[styles.sensorHint, themeStyles.textSecondary]}>
            Użyj przełącznika powyżej
          </Text>
        </View>
      )}
      
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, themeStyles.text]}>
            {isDarkMode ? 'NOCNY' : 'DZIENNY'}
          </Text>
          <Text style={[styles.statLabel, themeStyles.textSecondary]}>TRYB</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, themeStyles.text]}>{lux.toFixed(0)}</Text>
          <Text style={[styles.statLabel, themeStyles.textSecondary]}>LUX</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, themeStyles.text]}>
            {isAvailable ? 'TAK' : 'NIE'}
          </Text>
          <Text style={[styles.statLabel, themeStyles.textSecondary]}>CZUJNIK</Text>
        </View>
      </View>
    </View>
  );
}

// Стили для светлой темы
const lightStyles = {
  container: {
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#1a1a2e',
  },
  text: {
    color: '#333333',
  },
  textSecondary: {
    color: '#666666',
  }
};

// Стили для темной темы
const darkStyles = {
  container: {
    backgroundColor: '#0f3460',
  },
  title: {
    color: '#ffffff',
  },
  text: {
    color: '#ffffff',
  },
  textSecondary: {
    color: '#b8b8b8',
  }
};

// Базовые стили
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  sensorInfo: {
    marginBottom: 15,
  },
  sensorText: {
    fontSize: 16,
    marginBottom: 8,
  },
  luxBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  luxFill: {
    height: '100%',
    borderRadius: 4,
  },
  luxLow: {
    backgroundColor: '#e94560',
  },
  luxNormal: {
    backgroundColor: '#4ecdc4',
  },
  sensorHint: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
});