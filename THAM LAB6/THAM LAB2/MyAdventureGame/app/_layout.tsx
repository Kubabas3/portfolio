import { Stack } from 'expo-router';
import { AppProvider } from './context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="game/index"
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="settings/index"
          options={{ 
            headerShown: false
          }} 
        />
      </Stack>
    </AppProvider>
  );
}