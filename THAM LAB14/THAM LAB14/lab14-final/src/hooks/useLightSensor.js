// src/hooks/useLightSensor.js
import { useEffect, useState } from 'react';
import { LightSensor } from 'expo-sensors';
import { Platform } from 'react-native';

export const useLightSensor = (darkThreshold = 20) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lux, setLux] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    let subscription;

    const initLightSensor = async () => {
      if (Platform.OS === 'ios') {
        // На iOS датчик света может быть недоступен
        setIsAvailable(false);
        return;
      }

      try {
        const available = await LightSensor.isAvailableAsync();
        setIsAvailable(available);
        
        if (available) {
          LightSensor.setUpdateInterval(1000);
          subscription = LightSensor.addListener((data) => {
            const illuminance = data.illuminance || 0;
            setLux(illuminance);
            
            // Автоматическое переключение темы при < 20 люкс
            if (illuminance < darkThreshold) {
              setIsDarkMode(true);
            } else {
              setIsDarkMode(false);
            }
          });
        }
      } catch (error) {
        console.log('Błąd czujnika światła:', error);
        setIsAvailable(false);
      }
    };

    initLightSensor();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [darkThreshold]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return {
    isDarkMode,
    lux,
    isAvailable,
    toggleDarkMode,
    setIsDarkMode
  };
};