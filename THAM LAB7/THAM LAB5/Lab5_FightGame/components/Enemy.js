import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getEnemyImage, getEnemyName, getEnemyStamina } from '../utils/enemyData';

const Enemy = ({ strength, type, stamina }) => {
  const maxStamina = getEnemyStamina(type);
  
  const getEnemyColor = (enemyType) => {
    const colors = {
      ork: '#e74c3c',
      goblin: '#27ae60', 
      troll: '#3498db'
    };
    return colors[enemyType] || '#95a5a6';
  };

  return (
    <View style={[styles.container, { borderRightColor: getEnemyColor(type) }]}>
      <Image 
        source={getEnemyImage(type)} // ← ИЗМЕНЕНИЕ ЗДЕСЬ
        style={styles.image} 
      />
      <Text style={styles.name}>👹 {getEnemyName(type)}</Text>
      <View style={styles.stats}>
        <Text style={styles.stat}>💪 Siła: <Text style={styles.value}>{strength}</Text></Text>
        <Text style={styles.stat}>❤️ Wytrzymałość: <Text style={styles.value}>{stamina}</Text></Text>
      </View>
      <View style={[styles.healthBar, styles.healthBarBackground]}>
        <View 
          style={[
            styles.healthBar, 
            styles.healthBarFill,
            { 
              width: `${(stamina / maxStamina) * 100}%`,
              backgroundColor: getEnemyColor(type)
            }
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
    borderRightWidth: 4,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#bdc3c7',
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
    left: 0,
    top: 0,
  },
});

export default Enemy;