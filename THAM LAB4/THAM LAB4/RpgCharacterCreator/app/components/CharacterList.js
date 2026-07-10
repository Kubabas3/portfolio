import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { getClassInfo } from "../../utils/classInfo";

const PAPER_COLOR = "#f5e8c8";
const PAPER_BORDER = "#8B4513";

const CharacterList = ({ characters, onCharacterPress, onDeleteCharacter }) => {
  const renderCharacterItem = ({ item }) => {
    const classInfo = getClassInfo(item.heroClass);
    
    return (
      <TouchableOpacity 
        style={styles.characterCard}
        onPress={() => onCharacterPress(item)}
      >
        <View style={styles.characterHeader}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.characterImage} />
          )}
          <View style={styles.characterInfo}>
            <Text style={styles.characterName}>{item.heroName}</Text>
            <View style={[styles.classBadge, { backgroundColor: classInfo.color }]}>
              <Text style={styles.classText}>
                {classInfo.emoji} {item.heroClass}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.statsPreview}>
          <Text style={styles.statsText}>
            💪{item.points.sila} 🏃{item.points.zrecznosc} ❤️{item.points.kondycja}
          </Text>
          <Text style={styles.statsText}>
            🧠{item.points.inteligencja} 📚{item.points.madrosc} ✨{item.points.charyzma}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              "Zniszcz Zwój",
              `Czy na pewno chcesz zniszczyć zwój ${item.heroName}?`,
              [
                { text: "Zachowaj", style: "cancel" },
                { text: "Zniszcz", style: "destructive", onPress: () => onDeleteCharacter(item.id) }
              ]
            );
          }}
        >
          <Text style={styles.deleteText}>🔥</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archiwum Zwojów ({characters.length})</Text>
      
      {characters.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📜</Text>
          <Text style={styles.emptyText}>Archiwum jest puste</Text>
          <Text style={styles.emptySubtext}>Stwórz pierwszy zwój przeznaczenia!</Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  listContent: {
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#8B4513",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 5,
  },
  characterCard: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: PAPER_BORDER,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  characterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  characterImage: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: PAPER_BORDER,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#654321",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  classBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#654321",
  },
  classText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 11,
  },
  statsPreview: {
    marginBottom: 8,
  },
  statsText: {
    fontSize: 13,
    color: "#8B4513",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
  },
  deleteText: {
    fontSize: 14,
    color: "#8B0000",
  },
  emptyState: {
    alignItems: "center",
    padding: 30,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#8B4513",
    marginBottom: 4,
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  emptySubtext: {
    fontSize: 13,
    color: "#cd853f",
    fontStyle: "italic",
  },
});

export default CharacterList;