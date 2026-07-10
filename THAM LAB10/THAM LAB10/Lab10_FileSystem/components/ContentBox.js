import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default function ContentBox({ content }) {
  return (
    <View style={styles.contentBox}>
      <Text style={styles.contentTitle}>📜 Zawartość pliku zapisu (game_save.json):</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
}