import AsyncStorage from '@react-native-async-storage/async-storage';

const CHARACTERS_KEY = 'saved_characters';

export const saveCharacter = async (character) => {
  try {
    const existingCharacters = await getCharacters();
    const newCharacter = {
      ...character,
      id: Date.now().toString(), // Unikalne ID
      createdAt: new Date().toISOString()
    };
    
    const updatedCharacters = [...existingCharacters, newCharacter];
    await AsyncStorage.setItem(CHARACTERS_KEY, JSON.stringify(updatedCharacters));
    return true;
  } catch (error) {
    console.error('Błąd zapisu postaci:', error);
    return false;
  }
};

export const getCharacters = async () => {
  try {
    const characters = await AsyncStorage.getItem(CHARACTERS_KEY);
    return characters ? JSON.parse(characters) : [];
  } catch (error) {
    console.error('Błąd odczytu postaci:', error);
    return [];
  }
};

export const deleteCharacter = async (characterId) => {
  try {
    const characters = await getCharacters();
    const updatedCharacters = characters.filter(char => char.id !== characterId);
    await AsyncStorage.setItem(CHARACTERS_KEY, JSON.stringify(updatedCharacters));
    return true;
  } catch (error) {
    console.error('Błąd usuwania postaci:', error);
    return false;
  }
};

export const clearAllCharacters = async () => {
  try {
    await AsyncStorage.removeItem(CHARACTERS_KEY);
    return true;
  } catch (error) {
    console.error('Błąd czyszczenia postaci:', error);
    return false;
  }
};