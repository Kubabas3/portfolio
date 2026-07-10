import { View, Text, StyleSheet, Linking } from "react-native";

export default function AboutScreen() {
  const sendEmail = () => {
    Linking.openURL("mailto:przyklad@email.com");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>O autorze</Text>
        <Text style={styles.subtitle}>Twórca aplikacji Notatnik</Text>
      </View>
      
      <View style={styles.infoCard}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>👤 Imię i nazwisko:</Text>
          <Text style={styles.value}>Twój Name</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.label}>📧 Email:</Text>
          <Text style={[styles.value, styles.link]} onPress={sendEmail}>
            przyklad@email.com
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.label}>📞 Kontakt:</Text>
          <Text style={styles.value}>+48 123 456 789</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Aplikacja do tworzenia notatek v1.0
        </Text>
        <Text style={styles.footerSubtext}>
          Stworzona z React Native & Expo
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
    marginTop: 20,
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
  infoCard: {
    backgroundColor: "#FFF8F0",
    padding: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#FFE0B2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoItem: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#E65100",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  link: {
    color: "#FF6B35",
    textDecorationLine: "underline",
  },
  footer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: "#666",
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerSubtext: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
  },
});