import { mockHttpServer, mockWebSocket } from '../server/mockServer';

// HTTP API для получения данных врага
export const api = {
  // Получить случайного врага с сервера
  fetchRandomEnemy: async () => {
    try {
      console.log('🌐 HTTP: Fetching enemy data from server...');
      const enemyData = await mockHttpServer.getRandomEnemy();
      console.log('🌐 HTTP: Enemy data received:', enemyData);
      return enemyData;
    } catch (error) {
      console.error('🌐 HTTP: Error fetching enemy data:', error);
      // Fallback данные если сервер недоступен
      return {
        type: 'ork',
        strength: 10,
        stamina: 50
      };
    }
  },

  // WebSocket для случайных событий
  connectWebSocket: (onMessage, onError) => {
    try {
      console.log('🛰 WebSocket: Connecting...');
      const ws = mockWebSocket.connect(onMessage);
      console.log('🛰 WebSocket: Connected successfully');
      return ws;
    } catch (error) {
      console.error('🛰 WebSocket: Connection error:', error);
      if (onError) onError(error);
      return null;
    }
  }
};