// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete }) {
  const priorityColors = {
    high: '#e94560',
    medium: '#ff9a76',
    low: '#4ecdc4'
  };

  return (
    <View style={[styles.task, { borderLeftColor: priorityColors[task.priority] }]}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.toggle}>
        <View style={[styles.checkbox, task.status === 'completed' && styles.checked]}>
          {task.status === 'completed' && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={[styles.title, task.status === 'completed' && styles.completed]}>
          {task.title}
        </Text>
        <Text style={styles.priority}>
          {task.priority === 'high' ? 'Wysoki' : 
           task.priority === 'medium' ? 'Średni' : 'Niski'}
        </Text>
      </View>
      
      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  toggle: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#4ecdc4',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  priority: {
    color: '#b8b8b8',
    fontSize: 12,
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
  },
});