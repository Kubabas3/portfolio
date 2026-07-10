// Формула расчета урона: hit_points = floor((rand(1:6)-1/2)*strength)
export const calculateDamage = (strength) => {
  const randomValue = Math.floor(Math.random() * 6) + 1; // rand(1:6)
  const hitPoints = Math.floor((randomValue - 0.5) * strength);
  return Math.max(0, hitPoints); // Урон не может быть отрицательным
};

// Случайный выбор врага
export const getRandomEnemy = () => {
  const enemies = ['ork', 'goblin', 'troll'];
  return enemies[Math.floor(Math.random() * enemies.length)];
};

// Сила врага в зависимости от типа
export const getEnemyStrength = (enemyType) => {
  const strengthMap = {
    ork: 12,
    goblin: 6,
    troll: 15
  };
  return strengthMap[enemyType] || 10;
};