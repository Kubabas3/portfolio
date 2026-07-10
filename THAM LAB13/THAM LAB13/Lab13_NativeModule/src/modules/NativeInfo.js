// src/modules/NativeInfo.js
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NativeInfo = {
  // 1. Nazwa aplikacji i system operacyjny
  async getAppInfo() {
    try {
      const appName = await Application.getApplicationName();
      const osInfo = `System: ${Platform.OS} ${Platform.Version}`;
      return `${appName} | ${osInfo}`;
    } catch (error) {
      return 'RPG Game | System: Unknown';
    }
  },

  // 2. Typ i wersja procesora
  async getCPUInfo() {
    try {
      const deviceInfo = {
        model: Device.modelName || 'Unknown',
        osVersion: Device.osVersion || 'Unknown',
        platform: Device.platformApiLevel || 'Unknown'
      };
      return `Model: ${deviceInfo.model} | OS: ${deviceInfo.osVersion} | API: ${deviceInfo.platform}`;
    } catch (error) {
      return 'CPU: Unknown';
    }
  },

  // 3. Zapis komentarza
  async saveComment(comment) {
    try {
      await AsyncStorage.setItem('@rpg_comment', comment);
      return true;
    } catch (error) {
      console.error('Błąd zapisu komentarza:', error);
      return false;
    }
  },

  // 4. Pobranie komentarza
  async getComment() {
    try {
      const comment = await AsyncStorage.getItem('@rpg_comment');
      return comment || '';
    } catch (error) {
      console.error('Błąd odczytu komentarza:', error);
      return '';
    }
  },

  // 5. Wszystkie informacje na raz (dla RPG ekranu)
  async getAllInfo() {
    const [appInfo, cpuInfo, comment] = await Promise.all([
      this.getAppInfo(),
      this.getCPUInfo(),
      this.getComment()
    ]);
    
    return {
      appInfo,
      cpuInfo,
      comment,
      timestamp: new Date().toLocaleString()
    };
  }
};

export default NativeInfo;