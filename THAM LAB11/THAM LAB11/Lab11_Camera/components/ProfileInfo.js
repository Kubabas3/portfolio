import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

export default function ProfileInfo({ heroName, photoUri }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoTitle}>Twój profil:</Text>
      <Text style={styles.infoText}>Imię: {heroName || 'Brak'}</Text>
      <Text style={styles.infoText}>Zdjęcie: {photoUri ? 'Zrobione ✅' : 'Brak'}</Text>
    </View>
  );
}