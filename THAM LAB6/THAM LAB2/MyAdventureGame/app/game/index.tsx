import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useTranslations } from '../hooks/useTranslations';
import { useRouter } from 'expo-router';

export default function GameScreen() {
  const [currentScene, setCurrentScene] = useState('start');
  const { theme } = useAppContext();
  const { getScene, language, gameTitle, alerts } = useTranslations();
  const router = useRouter();

  const rollDice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const fightEnemy = () => {
    const playerRoll = rollDice();
    const enemyRoll = rollDice();
    
    if (playerRoll > enemyRoll) {
      Alert.alert(
        alerts.victory, 
        `${language === 'pl' ? 'Ty' : 'You'}: ${playerRoll} vs ${language === 'pl' ? 'Przeciwnik' : 'Enemy'}: ${enemyRoll}\n${alerts.victoryMessage}`
      );
      return 'win';
    } else if (playerRoll < enemyRoll) {
      Alert.alert(
        alerts.defeat, 
        `${language === 'pl' ? 'Ty' : 'You'}: ${playerRoll} vs ${language === 'pl' ? 'Przeciwnik' : 'Enemy'}: ${enemyRoll}\n${alerts.defeatMessage}`
      );
      return 'lose';
    } else {
      Alert.alert(
        alerts.draw, 
        `${language === 'pl' ? 'Ty' : 'You'}: ${playerRoll} vs ${language === 'pl' ? 'Przeciwnik' : 'Enemy'}: ${enemyRoll}\n${alerts.drawMessage}`
      );
      return 'draw';
    }
  };

  const handleChoice = (nextScene: string) => {
    console.log('Choice selected:', nextScene, 'Current scene:', currentScene);
    
    if (nextScene === 'fight' && currentScene === 'fight') {
      const result = fightEnemy();
      setCurrentScene(result);
    } else {
      setCurrentScene(nextScene);
    }
  };

  const goToSettings = () => {
    router.push('/settings');
  };

  const renderScene = () => {
    const scene = getScene(currentScene);
    
    console.log('Rendering scene:', currentScene, scene);
    
    if (!scene) {
      return (
        <View style={styles.sceneContainer}>
          <Text style={[styles.text, theme === 'dark' ? styles.darkText : styles.lightText]}>
            {language === 'pl' ? 'Błąd ładowania sceny: ' : 'Error loading scene: '}{currentScene}
          </Text>
          <View style={styles.button}>
            <Button
              title={language === 'pl' ? '🔁 Zacznij od nowa' : '🔁 Start over'}
              onPress={() => setCurrentScene('start')}
              color="#199e4aff"
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.sceneContainer}>
        
        {getSceneImage(currentScene) && (
          <Image source={getSceneImage(currentScene)} style={styles.image} />
        )}
        
        <Text style={[styles.text, theme === 'dark' ? styles.darkText : styles.lightText]}>
          {scene.text}
        </Text>
        
        <View style={styles.choicesContainer}>
          {scene.choices.map((choice: any, index: number) => (
            <View key={index} style={styles.button}>
              <Button
                title={choice.text}
                onPress={() => handleChoice(choice.next)}
                color="#199e4aff"
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const getSceneImage = (scene: string) => {
    const images: { [key: string]: any } = {
      left: require('../../assets/images/dragon.jpg'),
      right: require('../../assets/images/treasure.jpg'),
      fight: require('../../assets/images/dragon.jpg'),
      after_fight: require('../../assets/images/forest.jpg'),
      forest: require('../../assets/images/forest.jpg'),
      explore: require('../../assets/images/temple.jpg'),
      temple: require('../../assets/images/temple.jpg'),
      treasure: require('../../assets/images/treasure.jpg'),
      win: require('../../assets/images/treasure.jpg'),
      lose: require('../../assets/images/forest.jpg'),
      draw: require('../../assets/images/dragon.jpg')
    };
    return images[scene] || null;
  };

  return (
    <View style={[
      styles.container, 
      theme === 'dark' ? styles.darkContainer : styles.lightContainer
    ]}>
      {/* Header with title and settings button */}
      <View style={styles.header}>
        <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
          {gameTitle}
        </Text>
        <TouchableOpacity style={styles.settingsButton} onPress={goToSettings}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {renderScene()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  lightText: {
    color: '#2c3e50',
  },
  darkText: {
    color: '#ffffff',
  },
  settingsButton: {
    padding: 10,
  },
  settingsButtonText: {
    fontSize: 24,
  },
  sceneContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  choicesContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    margin: 8,
    width: 250,
    borderRadius: 10,
    overflow: 'hidden',
  },
});