// src/screens/MainScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { useShake } from '../hooks/useShake';
import { useLightSensor } from '../hooks/useLightSensor';
import TaskItem from '../components/TaskItem';
import ShakeControl from '../components/ShakeControl';
import ThemeControl from '../components/ThemeControl';

export default function MainScreen() {
  // Хуки
  const { tasks, addTask, toggleTask, deleteTask, deleteCompleted } = useTasks();
  const { isDarkMode, lux, isAvailable, toggleDarkMode } = useLightSensor(20);
  
  // Состояние
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  
  // Обработчик встряхивания
  const handleShake = () => {
    const removedCount = deleteCompleted();
    if (removedCount > 0) {
      Alert.alert('Wstrząsnięto!', `Usunięto ${removedCount} ukończonych zadań.`);
    }
  };
  
  // Используем детектор встряхивания
  useShake(handleShake, 1.8);
  
  // Добавление задачи
  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask.trim(), priority);
      setNewTask('');
      Alert.alert('Dodano!', 'Nowe zadanie zostało dodane.');
    }
  };
  
  // Стили в зависимости от темы
  const themeStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <KeyboardAvoidingView 
      style={[styles.container, themeStyles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={[styles.title, themeStyles.title]}>📜 RPG Task Manager</Text>
          <Text style={[styles.subtitle, themeStyles.textSecondary]}>
            Zadania: {tasks.length} | Ukończone: {tasks.filter(t => t.status === 'completed').length}
          </Text>
        </View>
        
        {/* Управление темой */}
        <ThemeControl 
          isDarkMode={isDarkMode}
          lux={lux}
          isAvailable={isAvailable}
          onToggleTheme={toggleDarkMode}
        />
        
        {/* Управление встряхиванием */}
        <ShakeControl 
          onTestShake={() => {
            Alert.alert('Test', 'Symulacja wstrząsu. Wstrząśnij telefonem w rzeczywistości.');
          }}
          onClearCompleted={() => {
            const count = deleteCompleted();
            Alert.alert('Usunięto', `Usunięto ${count} ukończonych zadań.`);
          }}
        />
        
        {/* Форма добавления задачи */}
        <View style={[styles.addCard, themeStyles.card]}>
          <Text style={[styles.sectionTitle, themeStyles.title]}>➕ Dodaj Nowe Zadanie</Text>
          
          <TextInput
            style={[styles.input, themeStyles.input]}
            placeholder="Np. Pokonać smoka..."
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            value={newTask}
            onChangeText={setNewTask}
          />
          
          <View style={styles.priorityButtons}>
            {['high', 'medium', 'low'].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && styles.priorityButtonActive,
                  priority === p && { backgroundColor: 
                    p === 'high' ? '#e94560' : 
                    p === 'medium' ? '#ff9a76' : '#4ecdc4' 
                  }
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={[
                  styles.priorityText,
                  priority === p && styles.priorityTextActive
                ]}>
                  {p === 'high' ? 'Wysoki' : p === 'medium' ? 'Średni' : 'Niski'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={[styles.addButton, !newTask.trim() && styles.addButtonDisabled]}
            onPress={handleAddTask}
            disabled={!newTask.trim()}
          >
            <Text style={styles.addButtonText}>Dodaj Zadanie RPG</Text>
          </TouchableOpacity>
        </View>
        
        {/* Список задач */}
        <View style={[styles.tasksCard, themeStyles.card]}>
          <Text style={[styles.sectionTitle, themeStyles.title]}>
            🎯 Twoje Zadania ({tasks.length})
          </Text>
          
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, themeStyles.textSecondary]}>
                Brak zadań. Dodaj pierwsze zadanie RPG!
              </Text>
            </View>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Светлая тема
const lightTheme = {
  container: { backgroundColor: '#f5f5f5' },
  title: { color: '#1a1a2e' },
  text: { color: '#333' },
  textSecondary: { color: '#666' },
  card: { backgroundColor: '#ffffff' },
  input: { 
    backgroundColor: '#f0f0f0',
    color: '#333',
    borderColor: '#ddd'
  }
};

// Темная тема
const darkTheme = {
  container: { backgroundColor: '#1a1a2e' },
  title: { color: '#ffffff' },
  text: { color: '#ffffff' },
  textSecondary: { color: '#b8b8b8' },
  card: { backgroundColor: '#16213e' },
  input: { 
    backgroundColor: '#0f3460',
    color: '#fff',
    borderColor: '#2a3c5e'
  }
};

// Базовые стили
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
  },
  addCard: {
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  priorityButtonActive: {
    // Цвет устанавливается динамически
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priorityTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#4ecdc4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#666',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksCard: {
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginVertical: 10,
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  infoCard: {
    borderRadius: 15,
    padding: 20,
    margin: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
});