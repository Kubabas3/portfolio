import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy'; // ← ВАЖНО: legacy API
import { Alert } from 'react-native';

// Запрос разрешений
export const requestPermissions = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  return {
    camera: cameraPermission.status === 'granted',
    media: mediaPermission.status === 'granted',
  };
};

// Сделать фото
export const takePicture = async () => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak uprawnień', 'Zezwól na dostęp do kamery');
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    console.error('Błąd kamery:', error);
    Alert.alert('Błąd', 'Nie udało się zrobić zdjęcia');
    return null;
  }
};

// Сохранить профиль
export const saveProfile = async (heroName, photoUri) => {
  if (!heroName.trim()) {
    Alert.alert('Błąd', 'Wpisz nazwę bohatera!');
    return false;
  }
  if (!photoUri) {
    Alert.alert('Błąd', 'Zrób zdjęcie bohatera!');
    return false;
  }

  try {
    // 1. Копируем фото
    const fileName = `hero_${Date.now()}.jpg`;
    const newPath = FileSystem.documentDirectory + fileName;
    await FileSystem.copyAsync({ from: photoUri, to: newPath });

    // 2. Создаём объект профиля
    const profileData = {
      heroName,
      photoPath: newPath,
      created: new Date().toISOString(),
    };

    // 3. Сохраняем JSON
    const profilePath = FileSystem.documentDirectory + 'hero_profile.json';
    await FileSystem.writeAsStringAsync(
      profilePath,
      JSON.stringify(profileData, null, 2)
    );

    Alert.alert('Sukces!', `Profil zapisany:\nImię: ${heroName}`);
    return true;
  } catch (error) {
    console.error('Błąd zapisu profilu:', error);
    Alert.alert('Błąd', 'Nie udało się zapisać profilu');
    return false;
  }
};

// Загрузить профиль
export const loadProfile = async () => {
  try {
    const profilePath = FileSystem.documentDirectory + 'hero_profile.json';
    const fileExists = await FileSystem.getInfoAsync(profilePath);
    
    if (!fileExists.exists) return null;

    const content = await FileSystem.readAsStringAsync(profilePath);
    return JSON.parse(content);
  } catch (error) {
    console.error('Błąd wczytywania:', error);
    return null;
  }
};

// Удалить профиль (дополнительно)
export const deleteProfile = async () => {
  try {
    const profilePath = FileSystem.documentDirectory + 'hero_profile.json';
    const fileExists = await FileSystem.getInfoAsync(profilePath);
    
    if (fileExists.exists) {
      await FileSystem.deleteAsync(profilePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Błąd usuwania:', error);
    return false;
  }
};