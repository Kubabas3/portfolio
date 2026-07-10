const enemies = [
  { type: 'ork', strength: 12, stamina: 60 },
  { type: 'goblin', strength: 6, stamina: 30 },
  { type: 'troll', strength: 15, stamina: 80 }
];

// Имитация HTTP ответа
export const mockHttpServer = {
  getRandomEnemy: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        // Добавляем немного случайности к параметрам
        const enemyWithRandomness = {
          type: randomEnemy.type,
          strength: randomEnemy.strength + Math.floor(Math.random() * 3) - 1, // -1, 0, +1
          stamina: randomEnemy.stamina + Math.floor(Math.random() * 10) - 5   // -5 до +5
        };
        resolve(enemyWithRandomness);
      }, 1000); // Имитация задержки сети
    });
  }
};

// Имитация WebSocket соединения
export const mockWebSocket = {
  connect: (onMessage) => {
    console.log('🛰 WebSocket: Connecting...');
    
    // Имитация WebSocket соединения
    const ws = {
      send: (data) => console.log('WebSocket send:', data),
      close: () => {
        clearInterval(eventInterval);
        console.log('🛰 WebSocket: Disconnected');
      }
    };
    
    // Имитация случайных событий
    const eventInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% шанс события
        const events = [
          { type: 'power_boost', value: 2, target: 'enemy', message: 'Przeciwnik zyskał +2 siły!' },
          { type: 'stamina_boost', value: 10, target: 'enemy', message: 'Przeciwnik zyskał +10 wytrzymałości!' },
          { type: 'heal', value: 15, target: 'enemy', message: 'Przeciwnik uleczył +15 punktów życia!' },
          { type: 'player_boost', value: 3, target: 'player', message: 'Zyskałeś +3 siły!' },
          { type: 'player_heal', value: 10, target: 'player', message: 'Uleczyłeś +10 punktów życia!' }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        console.log('🛰 WebSocket: Random event:', randomEvent);
        
        if (onMessage) {
          onMessage(randomEvent);
        }
      }
    }, 8000); // Проверка события каждые 8 секунд
    
    console.log('🛰 WebSocket: Connected');
    return ws;
  }
};