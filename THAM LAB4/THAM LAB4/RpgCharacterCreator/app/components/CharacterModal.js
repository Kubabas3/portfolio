import React from "react";
import { View, Text, StyleSheet, Image, Button, Modal, ScrollView, Platform } from "react-native";
import { getClassInfo } from "../../utils/classInfo";

const PAPER_COLOR = "#f5e8c8";
const PAPER_BORDER = "#8B4513";

const CharacterModal = ({ 
  modalVisible, 
  setModalVisible, 
  heroName, 
  heroClass, 
  points, 
  image,
  onSave 
}) => {
  const classInfo = getClassInfo(heroClass);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Zwoje Przeznaczenia</Text>
              
              {image && (
                <Image source={{ uri: image }} style={styles.modalImage} />
              )}
              
              <View style={[styles.classBadge, { backgroundColor: classInfo.color }]}>
                <Text style={styles.classText}>
                  {classInfo.emoji} {heroClass.toUpperCase()}
                </Text>
              </View>
              
              <Text style={styles.heroName}>{heroName}</Text>
              <Text style={styles.classDesc}>{classInfo.desc}</Text>
              
              <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Karty Przeznaczenia:</Text>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>💪 Siła (STR): {points.sila}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>🏃 Zręczność (DEX): {points.zrecznosc}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>❤️ Kondycja (CON): {points.kondycja}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>🧠 Inteligencja (INT): {points.inteligencja}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>📚 Mądrość (WIS): {points.madrosc}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statText}>✨ Charyzma (CHA): {points.charyzma}</Text>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <View style={styles.modalButton}>
                <Button 
                  title="📜 Zapisz Zwój" 
                  onPress={onSave}
                  color="#8B4513"
                />
              </View>
              <View style={styles.modalButton}>
                <Button 
                  title="❌ Zamknij" 
                  onPress={() => setModalVisible(false)}
                  color="#654321"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "85%",
  },
  modalContent: {
    backgroundColor: PAPER_COLOR,
    borderRadius: 15,
    padding: 25,
    borderWidth: 3,
    borderColor: PAPER_BORDER,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 15,
  },
  modalScroll: {
    width: "100%",
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#8B4513",
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#8B4513",
    alignSelf: "center",
  },
  classBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#654321",
  },
  classText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  heroName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#654321",
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  classDesc: {
    fontSize: 14,
    color: "#8B4513",
    marginBottom: 20,
    fontStyle: "italic",
    textAlign: "center",
  },
  statsContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: PAPER_BORDER,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#8B4513",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  statItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d2b48c",
  },
  statText: {
    fontSize: 16,
    color: "#654321",
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default CharacterModal;