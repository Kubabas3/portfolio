import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      setOrientation(width > height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    
    updateOrientation();

    
    const subscription = Dimensions.addEventListener('change', updateOrientation);

    
    return () => {
      subscription?.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;