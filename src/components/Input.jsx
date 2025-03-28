import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";

const InputForm = ({ label, onChange, error = "", isSecure = false, placeholderText }) => {
  const [input, setInput] = useState("");
  
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style={styles.input}
        value={input}
        placeholder={placeholderText}
        placeholderTextColor="#999"
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  subtitle: {
    width: "90%",
    fontSize: 16,
    fontFamily: "Josefin",
    color: colors.lightBlack,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderColor: colors.backgroundGray,
    borderRadius: 10,
    color: "black",
    paddingHorizontal: 10,
    fontFamily: "Josefin",
    fontSize: 15,
    backgroundColor: "#f8f8f8",
    elevation: 2, // Sombra sutil en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  error: {
    paddingTop: 4,
    fontSize: 14,
    color: "red",
    fontFamily: "Josefin",
    fontStyle: "italic",
  },
});
