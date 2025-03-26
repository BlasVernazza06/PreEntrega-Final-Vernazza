import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartData from "../data/cart.jsx";
import CartItem from "../components/CartItem";

const FavsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favoritos</Text>
      </View>
      <FlatList
        data={CartData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        contentContainerStyle={styles.favsList}
      />
    </View>
  );
};

export default FavsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleContainer: {
    alignItems: "center",
    paddingVertical: 10, // Solo el espacio necesario para el texto
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  favsList: {
    flexGrow: 1, // Permite que la lista ocupe todo el espacio disponible
  },
});
