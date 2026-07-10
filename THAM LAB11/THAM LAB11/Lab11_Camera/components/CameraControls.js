import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

export default function CameraControls({ onSwitchCamera, onTakePicture }) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.cameraButton} onPress={onSwitchCamera}>
        <Text style={styles.buttonText}>🔄 Wybierz z galerii</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cameraButton, styles.primaryButton]} onPress={onTakePicture}>
        <Text style={styles.buttonText}>📸 Zrób zdjęcie</Text>
      </TouchableOpacity>
    </View>
  );
}