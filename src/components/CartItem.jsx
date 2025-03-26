import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { removeCartItem } from "../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  
  const dispatch = useDispatch()

  const removeItem = () => {
    dispatch(removeCartItem({ id: cartItem.id }));
  }

  return (
    <View style={styles.card}>
      {/* Botón de eliminar (X) */}
      <Pressable style={styles.removeButton} onPress={removeItem}>
        <Entypo name="cross" size={24} color="red" />
      </Pressable>

      <View style={styles.imgSec}>
        <Image
          source={{ uri: cartItem.imagen }}
          style={styles.imgCartItem}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {cartItem.nombre} ({cartItem.quantity})
        </Text>
        <Text style={styles.text2}>{cartItem.destino}</Text>
        <Text style={styles.textPrecio}>
          ${Number(cartItem.precio).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 130,
    padding: 15,
    margin: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "white",
    flexWrap: 'wrap',
    position: "relative", // Necesario para posicionar el botón de eliminar
  },
  removeButton: {
    position: "absolute",
    top: -15,
    left: -15,
    padding: 5,
    zIndex: 10, // Asegura que esté por encima del contenido
  },
  imgSec: {
    marginRight: 20,
  },
  imgCartItem: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  text: {
    fontFamily: "Josefin",
    fontSize: 22,
    fontWeight: 'bold',
  },
  text2: {
    fontFamily: "Josefin",
    fontSize: 16,
    opacity: 0.6,
  },
  textPrecio: {
    color: '#5bc66b',
    fontWeight: 'bold'
  },
});
