import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles';

export default function SaveProfileButton({ onSave }) {
  return (
    <TouchableOpacity style={styles.saveButton} onPress={onSave}>
      <Text style={styles.saveButtonText}>💾 Zapisz profil bohatera</Text>
    </TouchableOpacity>
  );
}