// src/hooks/useTasks.js
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@rpg_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setTasks(JSON.parse(saved));
    } catch (error) {
      console.log('Błąd ładowania:', error);
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.log('Błąd zapisu:', error);
    }
  };

  const addTask = (title, priority = 'medium') => {
    const newTask = {
      id: Date.now().toString(),
      title,
      status: 'pending',
      priority,
      timestamp: new Date().toISOString()
    };
    saveTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    const updated = tasks.map(task =>
      task.id === id 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    );
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const deleteCompleted = () => {
    const pending = tasks.filter(task => task.status !== 'completed');
    saveTasks(pending);
    return tasks.length - pending.length;
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    deleteCompleted
  };
};