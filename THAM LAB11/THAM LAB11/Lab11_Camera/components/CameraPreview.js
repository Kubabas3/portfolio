import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from '../styles';

const CameraPreview = ({ photoUri, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.cameraContainer}>
        <ActivityIndicator size="large" color="#00b4d8" />
        <Text style={styles.placeholderSubtext}>Ładowanie...</Text>
      </View>
    );
  }

  if (photoUri) {
    return (
      <View style={styles.cameraContainer}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
      </View>
    );
  }

  // Когда фото нет — показываем заглушку
  return (
    <View style={styles.cameraContainer}>
      <View style={[styles.preview, { backgroundColor: '#1b3a4b', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>📷</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Naciśnij "Zrób zdjęcie"{'\n'}aby dodać zdjęcie bohatera
        </Text>
      </View>
    </View>
  );
};

export default CameraPreview;