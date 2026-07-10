import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = (duration = 300) => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });
  };

  const fadeOut = (duration = 300) => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    });
  };

  return {
    fadeAnim,
    fadeIn,
    fadeOut,
  };
};

export default useAnimation;