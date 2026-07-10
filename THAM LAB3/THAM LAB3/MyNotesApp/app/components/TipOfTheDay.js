import { View, Text, StyleSheet } from "react-native";

export default function TipOfTheDay() {
  const tips = [
    "Pij wodę regularnie przez cały dzień!",
    "Zrób krótką przerwę co godzinę pracy przy komputerze",
    "Zaplanuj jutrzejsze zadania wieczorem",
    "Zjedz zdrową przekąskę zamiast słodyczy",
    "Przypomnij sobie o trzech rzeczach, za które jesteś wdzięczny"
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💡 Porada dnia</Text>
      <Text style={styles.tip}>{randomTip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF3E0",
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#E65100",
  },
  tip: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    lineHeight: 22,
  },
});