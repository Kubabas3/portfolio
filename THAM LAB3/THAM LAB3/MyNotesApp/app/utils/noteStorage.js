import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTE_KEY = 'user_note';

export const saveNoteToStorage = async (text) => {
  try {
    await AsyncStorage.setItem(NOTE_KEY, text);
    return true;
  } catch (error) {
    console.error('Błąd zapisu:', error);
    return false;
  }
};

export const loadNoteFromStorage = async () => {
  try {
    const note = await AsyncStorage.getItem(NOTE_KEY);
    return note || '';
  } catch (error) {
    console.error('Błąd odczytu:', error);
    return '';
  }
};