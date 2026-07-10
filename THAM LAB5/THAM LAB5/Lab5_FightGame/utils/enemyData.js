export const getEnemyStamina = (enemyType) => {
  const staminaMap = {
    ork: 60,
    goblin: 30,
    troll: 80
  };
  return staminaMap[enemyType] || 50;
};

export const getEnemyImage = (enemyType) => {
  const imageMap = {
    ork: require('../assets/images/ork.png'),
    goblin: require('../assets/images/goblin.png'),
    troll: require('../assets/images/troll.png')
  };
  return imageMap[enemyType] || require('../assets/images/ork.png'); 
};


export const getEnemyName = (enemyType) => {
  const nameMap = {
    ork: 'Ork',
    goblin: 'Goblin',
    troll: 'Troll'
  };
  return nameMap[enemyType] || 'Przeciwnik';
};