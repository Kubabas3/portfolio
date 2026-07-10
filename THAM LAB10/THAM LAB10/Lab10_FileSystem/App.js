import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import styles from './styles';
import Header from './components/Header';
import ButtonGrid from './components/ButtonGrid';
import WeaponInfo from './components/WeaponInfo';
import ContentBox from './components/ContentBox';
import { saveProgress, loadProgress, deleteProgress, downloadWeapon, createGameSave } from './utils/gameSave';

export default function App() {
  const [fileContent, setFileContent] = useState('Brak zapisanego postępu.');
  const [downloadedWeapon, setDownloadedWeapon] = useState(null);
  const [weaponImageUri, setWeaponImageUri] = useState(null);

  const handleSave = async () => {
    const result = await saveProgress();
    Alert.alert(result.success ? '✅ Zapisano' : '❌ Błąd', result.message);
    if (result.success) setFileContent(JSON.stringify(result.data, null, 2));
  };

  const handleLoad = async () => {
    const result = await loadProgress();
    Alert.alert(result.success ? '📂 Wczytano' : '⚠️ Uwaga', result.message);
    if (result.success) setFileContent(JSON.stringify(result.data, null, 2));
    else setFileContent(result.message);
  };

  const handleDelete = async () => {
    const result = await deleteProgress();
    Alert.alert(result.success ? '🗑️ Usunięto' : 'ℹ️ Info', result.message);
    if (result.success) setFileContent('Plik usunięty.');
  };

  const handleDownload = async () => {
    const result = await downloadWeapon();
    Alert.alert(result.success ? '⚔️ Pobrano broń!' : '❌ Błąd', result.message);
    if (result.success) {
      setDownloadedWeapon(result.weaponData);
      setWeaponImageUri(result.imageUri);
    }
  };

  const handlePreview = () => {
    const gameSave = createGameSave();
    setFileContent(JSON.stringify(gameSave, null, 2));
    Alert.alert('👁️ Podgląd', 'Wyświetlono strukturę zapisu (nie zapisano).');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <ButtonGrid
        onSave={handleSave}
        onLoad={handleLoad}
        onPreview={handlePreview}
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
      <WeaponInfo weaponData={downloadedWeapon} imageUri={weaponImageUri} />
      <ContentBox content={fileContent} />
    </ScrollView>
  );
}