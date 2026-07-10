// src/screens/InfoScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import NativeInfo from '../modules/NativeInfo';
import { styles, colors } from '../styles';

export default function InfoScreen() {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [comment, setComment] = useState('');
  const [savedComment, setSavedComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDeviceInfo();
  }, []);

  const loadDeviceInfo = async () => {
    setLoading(true);
    try {
      const info = await NativeInfo.getAllInfo();
      const saved = await NativeInfo.getComment();
      
      setDeviceInfo(info);
      setSavedComment(saved);
    } catch (error) {
      console.error('Błąd ładowania informacji:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSaveComment = async () => {
    if (comment.trim()) {
      const success = await NativeInfo.saveComment(comment.trim());
      if (success) {
        setSavedComment(comment.trim());
        setComment('');
        alert('Komentarz zapisany!');
        await loadDeviceInfo();
      } else {
        alert('Błąd zapisu komentarza');
      }
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadDeviceInfo();
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.text, marginTop: 20 }}>Ładowanie informacji o systemie...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.accent]}
          tintColor={colors.accent}
        />
      }
    >
      {/* Nagłówek RPG */}
      <Text style={styles.header}>📱 Informacje Systemowe</Text>

      {/* Karta: Informacje o aplikacji i systemie */}
      <View style={styles.card}>
        <Text style={styles.infoTitle}>🎮 Aplikacja i System</Text>
        <Text style={styles.infoText}>
          {deviceInfo?.appInfo || 'Brak informacji'}
        </Text>
      </View>

      {/* Karta: Informacje o procesorze */}
      <View style={styles.card}>
        <Text style={styles.infoTitle}>⚙️ Procesor i Urządzenie</Text>
        <Text style={styles.infoText}>
          {deviceInfo?.cpuInfo || 'Brak informacji o CPU'}
        </Text>
        <Text style={[styles.infoText, { marginTop: 10, fontSize: 14 }]}>
          Ostatnie odświeżenie: {deviceInfo?.timestamp || 'Nieznany'}
        </Text>
      </View>

      {/* Karta: Wprowadzanie komentarza */}
      <View style={styles.card}>
        <Text style={styles.infoTitle}>💭 Dodaj Komentarz</Text>
        <TextInput
          style={styles.input}
          placeholder="Wpisz swój komentarz..."
          placeholderTextColor={colors.textSecondary}
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={200}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSaveComment}
          disabled={!comment.trim()}
        >
          <Text style={styles.buttonText}>
            Zapisz Komentarz
          </Text>
        </TouchableOpacity>
      </View>

      {/* Wyświetlenie zapisanego komentarza */}
      {savedComment ? (
        <View style={styles.card}>
          <Text style={styles.infoTitle}>📝 Twój Zapisany Komentarz</Text>
          <View style={styles.commentBox}>
            <Text style={styles.commentText}>"{savedComment}"</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => {
              NativeInfo.saveComment('');
              setSavedComment('');
              alert('Komentarz usunięty!');
            }}
          >
            <Text style={styles.buttonText}>Usuń Komentarz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.infoTitle}>💡 Brak komentarza</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Dodaj swój pierwszy komentarz!
          </Text>
        </View>
      )}

      {/* Odstęp na dole (zamiast stopki) */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}