import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const { language, theme, setLanguage, setTheme } = useAppContext();
  const router = useRouter();

  const handleLanguageChange = (newLanguage: 'pl' | 'en') => {
    setLanguage(newLanguage);
    Alert.alert('Sukces', `Język zmieniony na: ${newLanguage === 'pl' ? 'Polski' : 'English'}`);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    Alert.alert('Sukces', `Motyw zmieniony na: ${newTheme === 'light' ? 'Jasny' : 'Ciemny'}`);
  };

  const startGame = () => {
    router.push('/game');
  };

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
        {language === 'pl' ? '⚙️ Ustawienia Gry' : '⚙️ Game Settings'}
      </Text>

      {/* Wybór języka */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' ? styles.darkText : styles.lightText]}>
          {language === 'pl' ? '🌍 Wybierz język' : '🌍 Choose Language'}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              language === 'pl' ? styles.activeButton : styles.inactiveButton,
              theme === 'dark' ? styles.darkButton : styles.lightButton
            ]}
            onPress={() => handleLanguageChange('pl')}
          >
            <Text style={[
              styles.buttonText,
              language === 'pl' ? styles.activeButtonText : styles.inactiveButtonText
            ]}>
              🇵🇱 Polski
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              language === 'en' ? styles.activeButton : styles.inactiveButton,
              theme === 'dark' ? styles.darkButton : styles.lightButton
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Text style={[
              styles.buttonText,
              language === 'en' ? styles.activeButtonText : styles.inactiveButtonText
            ]}>
              🇬🇧 English
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Wybór motywu */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' ? styles.darkText : styles.lightText]}>
          {language === 'pl' ? '🎨 Wybierz motyw' : '🎨 Choose Theme'}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              theme === 'light' ? styles.activeButton : styles.inactiveButton,
              styles.lightButton
            ]}
            onPress={() => handleThemeChange('light')}
          >
            <Text style={[
              styles.buttonText,
              theme === 'light' ? styles.activeButtonText : styles.inactiveButtonText
            ]}>
              ☀️ {language === 'pl' ? 'Jasny' : 'Light'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              theme === 'dark' ? styles.activeButton : styles.inactiveButton,
              styles.darkButton
            ]}
            onPress={() => handleThemeChange('dark')}
          >
            <Text style={[
              styles.buttonText,
              theme === 'dark' ? styles.activeButtonText : styles.inactiveButtonText
            ]}>
              🌙 {language === 'pl' ? 'Ciemny' : 'Dark'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Przycisk startu gry */}
      <TouchableOpacity
        style={[styles.startButton, theme === 'dark' ? styles.darkStartButton : styles.lightStartButton]}
        onPress={startGame}
      >
        <Text style={styles.startButtonText}>
          {language === 'pl' ? '🎮 Rozpocznij Grę' : '🎮 Start Game'}
        </Text>
      </TouchableOpacity>

      {/* Aktualne ustawienia */}
      <View style={styles.currentSettings}>
        <Text style={[styles.currentSettingsText, theme === 'dark' ? styles.darkText : styles.lightText]}>
          {language === 'pl' ? 'Aktualne ustawienia:' : 'Current settings:'}
        </Text>
        <Text style={[styles.currentSettingsText, theme === 'dark' ? styles.darkText : styles.lightText]}>
          🌍 {language === 'pl' ? 'Polski' : 'English'} | 🎨 {theme === 'light' ? (language === 'pl' ? 'Jasny' : 'Light') : (language === 'pl' ? 'Ciemny' : 'Dark')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  lightText: {
    color: '#2c3e50',
  },
  darkText: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 2,
  },
  lightButton: {
    borderColor: '#bdc3c7',
  },
  darkButton: {
    borderColor: '#34495e',
  },
  activeButton: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  inactiveButtonText: {
    color: '#7f8c8d',
  },
  startButton: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  lightStartButton: {
    backgroundColor: '#27ae60',
  },
  darkStartButton: {
    backgroundColor: '#2ecc71',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentSettings: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
  },
  currentSettingsText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
});