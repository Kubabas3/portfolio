import { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TextInput, Button, Alert, 
  ScrollView, KeyboardAvoidingView, Platform, SafeAreaView,
  StatusBar 
} from "react-native";
import ClassPicker from "./components/ClassPicker";
import CustomImagePicker from "./components/ImagePicker";
import StatsDistribution from "./components/StatsDistribution";
import CharacterModal from "./components/CharacterModal";
import CharacterList from "./components/CharacterList";
import { saveCharacter, getCharacters, deleteCharacter, clearAllCharacters } from "../utils/storage";

const PAPER_COLOR = "#f5e8c8";
const PAPER_BORDER = "#8B4513";

export default function CharacterCreator() {
  const [heroName, setHeroName] = useState("");
  const [heroClass, setHeroClass] = useState("wojownik");
  const [points, setPoints] = useState({
    sila: 0,
    zrecznosc: 0,
    kondycja: 0,
    inteligencja: 0,
    madrosc: 0,
    charyzma: 0
  });
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [activeTab, setActiveTab] = useState("create");
  
  const totalPoints = 15;
  const usedPoints = points.sila + points.zrecznosc + points.kondycja + 
                    points.inteligencja + points.madrosc + points.charyzma;
  const availablePoints = totalPoints - usedPoints;

  useEffect(() => {
    loadSavedCharacters();
  }, []);

  const loadSavedCharacters = async () => {
    const characters = await getCharacters();
    setSavedCharacters(characters);
  };

  const updateStat = (stat, value) => {
    const newValue = points[stat] + value;
    
    if (newValue < 0) return;
    if (value > 0 && availablePoints <= 0) return;
    
    setPoints({
      ...points,
      [stat]: newValue
    });
  };

  const resetForm = () => {
    setHeroName("");
    setHeroClass("wojownik");
    setPoints({ 
      sila: 0, 
      zrecznosc: 0, 
      kondycja: 0, 
      inteligencja: 0, 
      madrosc: 0, 
      charyzma: 0 
    });
    setImage(null);
  };

  const showSummary = () => {
    if (usedPoints !== totalPoints) {
      Alert.alert("Uwaga", `Musisz wykorzystać wszystkie ${totalPoints} punktów!`);
      return;
    }
    if (!heroName.trim()) {
      Alert.alert("Uwaga", "Wpisz imię bohatera!");
      return;
    }
    setModalVisible(true);
  };

  const handleSaveCharacter = async () => {
    const character = {
      heroName,
      heroClass,
      points: { ...points },
      image
    };

    const success = await saveCharacter(character);
    
    if (success) {
      Alert.alert("Sukces", `Postać "${heroName}" została zapisana!`);
      resetForm();
      loadSavedCharacters();
      setActiveTab("list");
    } else {
      Alert.alert("Błąd", "Nie udało się zapisać postaci");
    }
    
    setModalVisible(false);
  };

  const handleDeleteCharacter = async (characterId) => {
    const success = await deleteCharacter(characterId);
    
    if (success) {
      Alert.alert("Sukces", "Postać została usunięta");
      loadSavedCharacters();
    } else {
      Alert.alert("Błąd", "Nie udało się usunąć postaci");
    }
  };

  const handleViewCharacter = (character) => {
    Alert.alert(
      character.heroName,
      `Klasa: ${character.heroClass}\nStatystyki:\n💪 ${character.points.sila} 🏃 ${character.points.zrecznosc}\n❤️ ${character.points.kondycja} 🧠 ${character.points.inteligencja}\n📚 ${character.points.madrosc} ✨ ${character.points.charyzma}`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={PAPER_COLOR} barStyle="dark-content" />
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.tabContainer}>
          <Button 
            title="📜 Tworzenie" 
            onPress={() => setActiveTab("create")}
            color={activeTab === "create" ? "#8B4513" : "#cd853f"}
          />
          <Button 
            title="📖 Lista postaci" 
            onPress={() => setActiveTab("list")}
            color={activeTab === "list" ? "#8B4513" : "#cd853f"}
          />
        </View>

        {activeTab === "create" ? (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Księga Stworzenia Bohatera</Text>

            <View style={styles.paperSection}>
              <Text style={styles.sectionTitle}>Imię Bohatera:</Text>
              <TextInput
                style={styles.input}
                placeholder="Wpisz imię bohatera..."
                placeholderTextColor="#8B4513"
                value={heroName}
                onChangeText={setHeroName}
              />
            </View>

            <View style={styles.paperSection}>
              <ClassPicker heroClass={heroClass} setHeroClass={setHeroClass} />
            </View>

            <View style={styles.paperSection}>
              <CustomImagePicker image={image} setImage={setImage} />
            </View>

            <View style={styles.paperSection}>
              <StatsDistribution 
                points={points} 
                availablePoints={availablePoints} 
                updateStat={updateStat} 
              />
            </View>

            <View style={styles.buttonsRow}>
              <View style={styles.button}>
                <Button 
                  title="🔄 Oczyść Zwój" 
                  onPress={resetForm}
                  color="#8B4513"
                />
              </View>
              <View style={styles.button}>
                <Button 
                  title="🔍 Podgląd" 
                  onPress={showSummary}
                  color="#654321"
                />
              </View>
            </View>

            {usedPoints !== totalPoints && (
              <Text style={styles.warning}>
                ⚠️ Musisz wykorzystać wszystkie {totalPoints} punktów!
              </Text>
            )}
          </ScrollView>
        ) : (
          <View style={styles.listContainer}>
            <CharacterList 
              characters={savedCharacters}
              onCharacterPress={handleViewCharacter}
              onDeleteCharacter={handleDeleteCharacter}
            />
          </View>
        )}

        <CharacterModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          heroName={heroName}
          heroClass={heroClass}
          points={points}
          image={image}
          onSave={handleSaveCharacter}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PAPER_COLOR,
  },
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 8 : 8,
    backgroundColor: "#d2b48c",
    borderBottomWidth: 2,
    borderBottomColor: PAPER_BORDER,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 20,
  },
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#8B4513",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 5,
  },
  paperSection: {
    backgroundColor: PAPER_COLOR,
    borderWidth: 2,
    borderColor: PAPER_BORDER,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#8B4513",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  input: {
    borderWidth: 1,
    borderColor: PAPER_BORDER,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    color: "#654321",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  warning: {
    color: "#8B0000",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});