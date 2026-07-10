import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';

export default function Header() {
  return (
    <>
      <Text style={styles.title}>📀 Menedżer Zapisu Gry RPG</Text>
      <Text style={styles.subtitle}>Laboratorium 10 – Zapisywanie i ładowanie plików</Text>
    </>
  );
}