import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { saveNoteToStorage, loadNoteFromStorage } from "../utils/noteStorage";

export default function NoteScreen() {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedNote();
  }, []);

  const loadSavedNote = async () => {
    try {
      const savedNote = await loadNoteFromStorage();
      setNote(savedNote);
    } catch (error) {
      console.error("Błąd ładowania notatki:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    if (note.trim() === "") {
      Alert.alert("Uwaga", "Notatka jest pusta!");
      return;
    }

    setIsLoading(true);
    const success = await saveNoteToStorage(note);
    
    if (success) {
      Alert.alert("Sukces", "Notatka zapisana pomyślnie!");
    } else {
      Alert.alert("Błąd", "Nie udało się zapisać notatki");
    }
    setIsLoading(false);
  };

  const clearNote = () => {
    setNote("");
    Alert.alert("Wyczyszczono", "Notatka została wyczyszczona");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Ładowanie...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Twoja notatka</Text>
        <Text style={styles.subtitle}>Zapisuje się automatycznie</Text>
      </View>
      
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Wpisz tutaj swoją notatkę..."
        placeholderTextColor="#999"
        value={note}
        onChangeText={setNote}
        textAlignVertical="top"
      />
      
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button 
            title="💾 Zapisz notatkę" 
            onPress={saveNote} 
            color="#FF6B35" 
            disabled={isLoading}
          />
        </View>
        
        <View style={styles.button}>
          <Button 
            title="🗑️ Wyczyść" 
            onPress={clearNote} 
            color="#FF5722" 
            disabled={isLoading}
          />
        </View>
      </View>

      <Text style={styles.noteInfo}>
        Twoja notatka jest bezpiecznie zapisana w pamięci urządzenia
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  loadingText: {
    fontSize: 18,
    color: "#FF6B35",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#FFE0B2",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 200,
    marginBottom: 20,
    backgroundColor: "#FFFBF5",
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  noteInfo: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    fontSize: 12,
    padding: 10,
    backgroundColor: "#FFF8F0",
    borderRadius: 8,
  },
});