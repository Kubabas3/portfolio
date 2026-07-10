// src/hooks/useShake.js
import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

export const useShake = (onShake, threshold = 1.8) => {
  const lastShake = useRef(0);

  useEffect(() => {
    let subscription;

    const initAccelerometer = async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      if (isAvailable) {
        Accelerometer.setUpdateInterval(100);
        subscription = Accelerometer.addListener((data) => {
          const force = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2);
          
          if (force > threshold) {
            const now = Date.now();
            if (now - lastShake.current > 2000) { // 2 секунды задержки
              lastShake.current = now;
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onShake();
            }
          }
        });
      }
    };

    initAccelerometer();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [onShake, threshold]);
};