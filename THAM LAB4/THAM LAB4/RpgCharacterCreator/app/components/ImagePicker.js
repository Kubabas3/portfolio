import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const PAPER_COLOR = "#f5e8c8";
const PAPER_BORDER = "#8B4513";

const CustomImagePicker = ({ image, setImage }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Zaklęcie nie działa', 'Potrzebujemy pozwolenia na dostęp do magicznych obrazów!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Text style={styles.label}>Wizerunek Bohatera:</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderIcon}>🔮</Text>
            <Text style={styles.imagePlaceholderText}>Dotknij aby wybrać wizerunek</Text>
          </View>
        )}
      </TouchableOpacity>
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
  imagePicker: {
    height: 120,
    borderWidth: 2,
    borderColor: PAPER_BORDER,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  imagePlaceholder: {
    alignItems: "center",
    padding: 10,
  },
  imagePlaceholderIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: "#8B4513",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default CustomImagePicker;