import React from 'react';
import { View, Button } from 'react-native';
import styles from '../styles';

export default function ButtonGrid({ onSave, onLoad, onPreview, onDelete, onDownload }) {
  return (
    <View style={styles.buttonGrid}>
      <View style={styles.buttonWrapper}><Button title="💾 Zapisz grę" onPress={onSave} color="#4CAF50" /></View>
      <View style={styles.buttonWrapper}><Button title="📂 Wczytaj grę" onPress={onLoad} color="#2196F3" /></View>
      <View style={styles.buttonWrapper}><Button title="👁️ Podgląd" onPress={onPreview} color="#FF9800" /></View>
      <View style={styles.buttonWrapper}><Button title="🗑️ Usuń zapis" onPress={onDelete} color="#F44336" /></View>
      <View style={[styles.buttonWrapper, styles.downloadButton]}><Button title="⚔️ Pobierz broń" onPress={onDownload} color="#9C27B0" /></View>
    </View>
  );
}