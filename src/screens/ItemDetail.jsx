import { Image, StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGetProductbyIdQuery } from "../services/shopService";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice";

import { Ionicons } from "@expo/vector-icons"
import { colors } from '../global/colors';

const ItemDetail = ({ route, navigation }) => {
  // Se crea un estado para el modal.
  const [modalVisible, setModalVisible] = useState(false);

  // Se obtiene el dispatch.
  const dispatch = useDispatch();

  // Se obtiene el id del producto.
  const { productId: idSelected } = route.params

  // Se obtiene el producto de la base de datos.
  const { data: product } = useGetProductbyIdQuery(idSelected)

  // Se formatea el precio.
  const formatPrice = (price) => {
    if (!price) return "0.00";
    return Number(price).toFixed(2);
  };

  // Se obtiene la función para agregar el producto al carrito.
  const handleAddCart = () => {
    if (product) {
      const formattedProduct = {
        ...product,
        precio: Number(product.precio), // Esto está bien porque es para el cálculo
        quantity: 1
      };
      dispatch(addCartItem(formattedProduct));
      setModalVisible(true);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      {product ? (
        <>
          <View style={styles.HeaderProducts}>
            <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.imgDisplay}>
              <Image source={{ uri: product.imagen }} style={styles.image} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>{product.nombre}</Text>
              <Text>{product.pais}</Text>
              <View style={styles.priceSec}>
                <View style={styles.priceSecText}>
                  <Text>Precio final</Text>
                  <Text style={styles.price}>
                    ${String(formatPrice(product.precio))}
                  </Text>
                  <Text>Incluyen impuestos, tasas y cargos </Text>
                </View>
                <Pressable style={styles.addButton} onPress={handleAddCart}>
                  <Text style={styles.addButtonText}>Al carrito</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>¡Producto agregado al carrito!</Text>
                <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </>
      ) : null}
    </SafeAreaView>
  );
}

export default ItemDetail

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 10,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  HeaderProducts: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  imgDisplay: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  priceSec: {
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "gray",
    gap: 10,
    padding: 10,
    alignItems: "center",
  },
  priceSecText: {
    flexDirection: "column",
    marginRight: 20,
  },
  price: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: colors.orangeLogo,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  ButtonCart: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    color: 'white',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: colors.orangeLogo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
