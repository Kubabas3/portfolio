import { View, Text, StyleSheet } from "react-native";
import TipOfTheDay from "../components/TipOfTheDay";

export default function WelcomeScreen() {
  const currentDate = new Date().toLocaleString('pl-PL');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Witaj w Notatniku! 📝</Text>
        <Text style={styles.subtitle}>Twój osobisty asystent</Text>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.label}>Data i czas uruchomienia:</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      <TipOfTheDay />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Użyj menu na dole, aby przejść do innych ekranów
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  infoBox: {
    backgroundColor: "#FFF3E0",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#E65100",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  footer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#FFF8F0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  footerText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },
});