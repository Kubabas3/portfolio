import React from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";

const StatsDistribution = ({ points, availablePoints, updateStat }) => {
  return (
    <>
      <Text style={styles.label}>Punkty charakterystyk ({availablePoints} dostępne):</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statName}>💪 Siła (STR)</Text>
          <Text style={styles.statDesc}>Fizyczna moc, walka wręcz</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('sila', -1)} disabled={points.sila <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.sila}</Text>
            <Button title="+" onPress={() => updateStat('sila', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statName}>🏃 Zręczność (DEX)</Text>
          <Text style={styles.statDesc}>Refleks, zwinność, strzelanie</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('zrecznosc', -1)} disabled={points.zrecznosc <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.zrecznosc}</Text>
            <Button title="+" onPress={() => updateStat('zrecznosc', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statName}>❤️ Kondycja (CON)</Text>
          <Text style={styles.statDesc}>Wytrzymałość, zdrowie</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('kondycja', -1)} disabled={points.kondycja <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.kondycja}</Text>
            <Button title="+" onPress={() => updateStat('kondycja', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statName}>🧠 Inteligencja (INT)</Text>
          <Text style={styles.statDesc}>Wiedza, logika, pamięć</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('inteligencja', -1)} disabled={points.inteligencja <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.inteligencja}</Text>
            <Button title="+" onPress={() => updateStat('inteligencja', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statName}>📚 Mądrość (WIS)</Text>
          <Text style={styles.statDesc}>Intuicja, percepcja, przetrwanie</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('madrosc', -1)} disabled={points.madrosc <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.madrosc}</Text>
            <Button title="+" onPress={() => updateStat('madrosc', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statName}>✨ Charyzma (CHA)</Text>
          <Text style={styles.statDesc}>Perswazja, przywództwo, urok</Text>
          <View style={styles.statControls}>
            <Button title="-" onPress={() => updateStat('charyzma', -1)} disabled={points.charyzma <= 0} color="#8B4513" />
            <Text style={styles.statValue}>{points.charyzma}</Text>
            <Button title="+" onPress={() => updateStat('charyzma', 1)} disabled={availablePoints <= 0} color="#8B4513" />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 5,
    color: "#8B4513",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  statsGrid: {
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#8B4513",
  },
  statName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#654321",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  statDesc: {
    fontSize: 12,
    color: "#8B4513",
    marginBottom: 8,
    fontStyle: "italic",
  },
  statControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
    color: "#8B4513",
  },
});

export default StatsDistribution;