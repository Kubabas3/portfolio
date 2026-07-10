import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ClassPicker = ({ heroClass, setHeroClass }) => {
  return (
    <>
      <Text style={styles.label}>Klasa postaci:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={heroClass}
          onValueChange={(itemValue) => setHeroClass(itemValue)}
          style={styles.picker}
          dropdownIconColor="#8B4513"
        >
          <Picker.Item label="⚔️ Wojownik" value="wojownik" />
          <Picker.Item label="🛡️ Paladyn" value="paladyn" />
          <Picker.Item label="🔮 Czarodziej" value="czarodziej" />
          <Picker.Item label="🗡️ Łotr" value="lotr" />
          <Picker.Item label="🌿 Druid" value="druid" />
          <Picker.Item label="🙏 Kapłan" value="kaplan" />
        </Picker>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#8B4513",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#654321",
  },
});

export default ClassPicker;