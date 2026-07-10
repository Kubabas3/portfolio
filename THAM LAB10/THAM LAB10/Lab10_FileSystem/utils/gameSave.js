import * as FileSystem from 'expo-file-system/legacy';

const SAVE_FILE_PATH = FileSystem.documentDirectory + 'game_save.json';


export const createGameSave = () => ({
  player: {
    name: 'Aragorn',
    level: 12,
    experience: 3450,
    experienceToNextLevel: 5000,
    health: 85,
    maxHealth: 100,
    mana: 60,
    maxMana: 80,
    strength: 18,
    agility: 14,
    intelligence: 8,
  },
  location: {
    current: 'Komnata ze skarbem',
    previous: 'Podziemia zamku',
    discovered: ['Wioska', 'Las', 'Zamek', 'Podziemia', 'Komnata'],
  },
  inventory: {
    gold: 1250,
    weapons: ['Miecz stalowy', 'Łuk elficki'],
    armor: ['Zbroja płytowa', 'Hełm rycerski'],
    potions: ['Mikstura zdrowia', 'Eliksir many'],
    keys: ['Klucz do komnaty', 'Klucz do skarbca'],
  },
  quests: {
    completed: ['Ratowanie wioski', 'Pokonanie goblinów'],
    active: ['Otwórz skarbiec', 'Znajdź legendarne artefakty'],
    failed: [],
  },
  gameTime: '15h 42m',
  lastSave: new Date().toISOString(),
});


export const saveProgress = async () => {
  const gameSave = createGameSave();
  try {
    await FileSystem.writeAsStringAsync(SAVE_FILE_PATH, JSON.stringify(gameSave, null, 2));
    return { success: true, data: gameSave, message: 'Postęp gry został zapisany pomyślnie.' };
  } catch (error) {
    console.error('Błąd zapisu:', error);
    return { success: false, message: 'Nie udało się zapisać postępu.' };
  }
};


export const loadProgress = async () => {
  try {
    const content = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);
    const parsed = JSON.parse(content);
    return { success: true, data: parsed, message: 'Postęp gry został wczytany.' };
  } catch (error) {
    console.error('Błąd odczytu:', error);
    return { success: false, message: 'Brak zapisanego postępu.' };
  }
};


export const deleteProgress = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(SAVE_FILE_PATH);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(SAVE_FILE_PATH);
      return { success: true, message: 'Zapis gry został usunięty.' };
    }
    return { success: false, message: 'Brak pliku do usunięcia.' };
  } catch (error) {
    console.error('Błąd usuwania:', error);
    return { success: false, message: 'Nie udało się usunąć pliku.' };
  }
};


export const downloadWeapon = async () => {
  const remoteJsonUrl = 'https://raw.githubusercontent.com/Kubabas3/lab10-assets/refs/heads/main/lab10_assets/weapon.json';
  const remoteImageUrl = 'https://github.com/Kubabas3/lab10-assets/blob/main/lab10_assets/weapon.png?raw=true';

  const localJsonPath = FileSystem.documentDirectory + 'downloaded_weapon.json';
  const localImagePath = FileSystem.documentDirectory + 'weapon_image.png';

  try {
    await FileSystem.downloadAsync(remoteJsonUrl, localJsonPath);
    const jsonContent = await FileSystem.readAsStringAsync(localJsonPath);
    const weaponData = JSON.parse(jsonContent);

    await FileSystem.downloadAsync(remoteImageUrl, localImagePath);

    let gameSave;
    try {
      const existingSave = await FileSystem.readAsStringAsync(SAVE_FILE_PATH);
      gameSave = JSON.parse(existingSave);
    } catch {
      gameSave = createGameSave();
    }

    if (gameSave.inventory?.weapons) {
      gameSave.inventory.weapons.push(weaponData.name);
      await FileSystem.writeAsStringAsync(SAVE_FILE_PATH, JSON.stringify(gameSave, null, 2));
    }

    return {
      success: true,
      weaponData,
      imageUri: localImagePath,
      message: `Pobrano broń: "${weaponData.name}"`,
    };
  } catch (error) {
    console.error('Błąd pobierania broni:', error);
    return { success: false, message: 'Nie udało się pobrać broni.' };
  }
};