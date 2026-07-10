import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import HeroNameInput from './components/HeroNameInput';
import CameraPreview from './components/CameraPreview';
import CameraControls from './components/CameraControls';
import SaveProfileButton from './components/SaveProfileButton';
import ProfileInfo from './components/ProfileInfo';
import { takePicture, saveProfile, loadProfile } from './utils/cameraFunctions';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [heroName, setHeroName] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Сделать фото
  const handleTakePicture = async () => {
    setIsLoading(true);
    const uri = await takePicture();
    if (uri) setPhotoUri(uri);
    setIsLoading(false);
  };

  // Выбрать из галереи
  const handleSelectFromGallery = async () => {
    setIsLoading(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Brak uprawnień', 'Zezwól na dostęp do galerii');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Błąd galerii:', error);
    }
    setIsLoading(false);
  };

  // Сохранить профиль
  const handleSaveProfile = async () => {
    const success = await saveProfile(heroName, photoUri);
    if (success) {
      // Opcjonalnie: reset formy
      // setHeroName('');
      // setPhotoUri(null);
    }
  };

  // Wczytać zapisany profil
  const handleLoadProfile = async () => {
    const profile = await loadProfile();
    if (profile) {
      setHeroName(profile.heroName);
      setPhotoUri(profile.photoPath);
      Alert.alert('Wczytano', `Profil: ${profile.heroName}`);
    } else {
      Alert.alert('Info', 'Brak zapisanego profilu');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📸 Tworzenie Profilu Bohatera RPG</Text>
      
      <HeroNameInput heroName={heroName} setHeroName={setHeroName} />
      <CameraPreview photoUri={photoUri} isLoading={isLoading} />
      <CameraControls 
        onSwitchCamera={handleSelectFromGallery} 
        onTakePicture={handleTakePicture} 
      />
      <SaveProfileButton onSave={handleSaveProfile} />
      
      {/* Nowa przycisk do wczytywania profilu */}
      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: '#2196F3', marginTop: 10 }]} 
        onPress={handleLoadProfile}
      >
        <Text style={styles.saveButtonText}>📂 Wczytaj zapisany profil</Text>
      </TouchableOpacity>
      
      <ProfileInfo heroName={heroName} photoUri={photoUri} />
    </ScrollView>
  );
}