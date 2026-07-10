import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '../styles';

export default function HeroNameInput({ heroName, setHeroName }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Imię bohatera:</Text>
      <TextInput
        style={styles.input}
        placeholder="Wprowadź imię..."
        value={heroName}
        onChangeText={setHeroName}
        maxLength={30}
        placeholderTextColor="#888"
      />
    </View>
  );
}