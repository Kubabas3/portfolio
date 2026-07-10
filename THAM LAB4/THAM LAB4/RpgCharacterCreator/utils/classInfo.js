export const getClassInfo = (className) => {
  const classes = {
    wojownik: { color: "#8B4513", emoji: "⚔️", desc: "Mistrz broni białej" },
    paladyn: { color: "#FFD700", emoji: "🛡️", desc: "Boży wojownik" },
    czarodziej: { color: "#4B0082", emoji: "🔮", desc: "Władca magii" },
    lotr: { color: "#2F4F4F", emoji: "🗡️", desc: "Master złodziej" },
    druid: { color: "#228B22", emoji: "🌿", desc: "Strażnik przyrody" },
    kaplan: { color: "#FFFAF0", emoji: "🙏", desc: "Sługa bóstw" }
  };
  return classes[className] || classes.wojownik;
};

export const getAllClasses = () => {
  return [
    { value: "wojownik", label: "⚔️ Wojownik", color: "#8B4513" },
    { value: "paladyn", label: "🛡️ Paladyn", color: "#FFD700" },
    { value: "czarodziej", label: "🔮 Czarodziej", color: "#4B0082" },
    { value: "lotr", label: "🗡️ Łotr", color: "#2F4F4F" },
    { value: "druid", label: "🌿 Druid", color: "#228B22" },
    { value: "kaplan", label: "🙏 Kapłan", color: "#FFFAF0" }
  ];
};