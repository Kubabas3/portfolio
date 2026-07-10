import { useAppContext } from '../context/AppContext';

const translations = {
  pl: {
    gameTitle: "🏰 Moja Przygoda",
    scenes: {
      start: {
        text: "Witaj w grze! Stoisz na rozstaju dróg. Gdzie pójdziesz?",
        choices: [
          { text: "W lewo", next: "left" },
          { text: "W prawo", next: "right" }
        ]
      },
      left: {
        text: "Poszedłeś w lewo i spotkałeś smoka! Chce z tobą walczyć.",
        choices: [
          { text: "⚔️ Walcz", next: "fight" },
          { text: "🏃 Uciekaj", next: "start" }
        ]
      },
      right: {
        text: "Poszedłeś w prawo i znalazłeś skrzynię ze skarbami!",
        choices: [
          { text: "💰 Otwórz", next: "treasure" },
          { text: "↩️ Wróć", next: "start" }
        ]
      },
      fight: {
        text: "Rzuć kośćmi aby walczyć ze smokiem!",
        choices: [
          { text: "🎲 Rzuć kośćmi", next: "fight" },
          { text: "🏃 Uciekaj", next: "start" }
        ]
      },
      after_fight: {
        text: "Kontynuujesz swoją podróż... Co robisz dalej?",
        choices: [
          { text: "↩️ Wróć do rozstaju", next: "start" },
          { text: "➡️ Idź naprzód", next: "forest" }
        ]
      },
      forest: {
        text: "Jesteś w ciemnym lesie. Słyszysz dziwne dźwięki...",
        choices: [
          { text: "🔍 Zbadaj", next: "explore" },
          { text: "↩️ Wróć", next: "after_fight" }
        ]
      },
      explore: {
        text: "Znalazłeś starożytną świątynię!",
        choices: [
          { text: "🚪 Wejdź do świątyni", next: "temple" },
          { text: "↩️ Wróć", next: "forest" }
        ]
      },
      temple: {
        text: "W świątyni znalazłeś magiczny artefakt! Wygrałeś grę! 🏆",
        choices: [
          { text: "🔄 Zacznij od nowa", next: "start" }
        ]
      },
      treasure: {
        text: "Otworzyłeś skrzynię i znalazłeś złoto! Gratulacje! 💰",
        choices: [
          { text: "🔄 Zacznij od nowa", next: "start" }
        ]
      },
      win: {
        text: "Pokonałeś smoka i zabrałeś jego skarby! 💪",
        choices: [
          { text: "➡️ Kontynuuj podróż", next: "after_fight" }
        ]
      },
      lose: {
        text: "Przegrałeś ze smokiem... ale udało ci się uciec.",
        choices: [
          { text: "↩️ Wróć do rozstaju", next: "start" }
        ]
      },
      draw: {
        text: "Remis! Rzuć kośćmi ponownie!",
        choices: [
          { text: "🎲 Rzuć ponownie", next: "fight" },
          { text: "🏃 Uciekaj", next: "start" }
        ]
      }
    },
    alerts: {
      victory: "Zwycięstwo!",
      defeat: "Porażka!",
      draw: "Remis!",
      victoryMessage: "Pokonałeś wroga!",
      defeatMessage: "Przegrałeś...",
      drawMessage: "Remis! Rzućcie ponownie."
    }
  },
  en: {
    gameTitle: "🏰 My Adventure",
    scenes: {
      start: {
        text: "Welcome to the game! You stand at a crossroads. Where will you go?",
        choices: [
          { text: "Left", next: "left" },
          { text: "Right", next: "right" }
        ]
      },
      left: {
        text: "You went left and encountered a dragon! It wants to fight you.",
        choices: [
          { text: "⚔️ Fight", next: "fight" },
          { text: "🏃 Run away", next: "start" }
        ]
      },
      right: {
        text: "You went right and found a treasure chest!",
        choices: [
          { text: "💰 Open", next: "treasure" },
          { text: "↩️ Go back", next: "start" }
        ]
      },
      fight: {
        text: "Roll the dice to fight the dragon!",
        choices: [
          { text: "🎲 Roll dice", next: "fight" },
          { text: "🏃 Run away", next: "start" }
        ]
      },
      after_fight: {
        text: "You continue your journey... What do you do next?",
        choices: [
          { text: "↩️ Return to crossroads", next: "start" },
          { text: "➡️ Go forward", next: "forest" }
        ]
      },
      forest: {
        text: "You are in a dark forest. You hear strange sounds...",
        choices: [
          { text: "🔍 Explore", next: "explore" },
          { text: "↩️ Go back", next: "after_fight" }
        ]
      },
      explore: {
        text: "You found an ancient temple!",
        choices: [
          { text: "🚪 Enter temple", next: "temple" },
          { text: "↩️ Go back", next: "forest" }
        ]
      },
      temple: {
        text: "In the temple you found a magical artifact! You won the game! 🏆",
        choices: [
          { text: "🔄 Start over", next: "start" }
        ]
      },
      treasure: {
        text: "You opened the chest and found gold! Congratulations! 💰",
        choices: [
          { text: "🔄 Start over", next: "start" }
        ]
      },
      win: {
        text: "You defeated the dragon and took its treasures! 💪",
        choices: [
          { text: "➡️ Continue journey", next: "after_fight" }
        ]
      },
      lose: {
        text: "You lost to the dragon... but managed to escape.",
        choices: [
          { text: "↩️ Return to crossroads", next: "start" }
        ]
      },
      draw: {
        text: "Draw! Roll the dice again!",
        choices: [
          { text: "🎲 Roll again", next: "fight" },
          { text: "🏃 Run away", next: "start" }
        ]
      }
    },
    alerts: {
      victory: "Victory!",
      defeat: "Defeat!",
      draw: "Draw!",
      victoryMessage: "You defeated the enemy!",
      defeatMessage: "You lost...",
      drawMessage: "Draw! Roll again."
    }
  }
};

export const useTranslations = () => {
  const { language } = useAppContext();

  const currentTranslations = translations[language];

  const getScene = (sceneKey: string) => {
    return currentTranslations.scenes[sceneKey as keyof typeof currentTranslations.scenes];
  };

  return {
    getScene,
    language,
    gameTitle: currentTranslations.gameTitle,
    alerts: currentTranslations.alerts
  };
};