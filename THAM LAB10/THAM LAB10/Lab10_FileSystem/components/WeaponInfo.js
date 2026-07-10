import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';

export default function WeaponInfo({ weaponData, imageUri }) {
  if (!weaponData) return null;

  return (
    <View style={styles.weaponBox}>
      <Text style={styles.weaponTitle}>🆕 Pobrana broń:</Text>
      <Text style={styles.weaponText}>Nazwa: {weaponData.name}</Text>
      <Text style={styles.weaponText}>Obrażenia: {weaponData.damage}</Text>
      <Text style={styles.weaponText}>Typ: {weaponData.type}</Text>
      <Text style={styles.weaponText}>Rzadkość: {weaponData.rarity}</Text>
      <Text style={styles.weaponText}>Cena: {weaponData.priceInGold} złota</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.weaponImage} />}
    </View>
  );
}