import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native"

import CartItem from "../components/CartItem"

import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux"; 
import { usePostOrderMutation } from "../services/shopService";
import { colors } from "../global/colors.jsx"

const Cart = ({ navigation }) => {
  const {items: CartData, total} = useSelector((state)=> state.cart.value)
  const [triggerPostOrder, result] = usePostOrderMutation()

  const onConfirmOrder = () => {
    triggerPostOrder({ items: CartData, user: "Luka", total })
  }

  const verifyCart = () => {
    return CartData.length === 0
  }


  return (
    <View style={styles.mainContainer}>
      {verifyCart() ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            <Image source={{ uri: "https://i.postimg.cc/90frkb8p/icons8-comprar-100.png" }} style={styles.emptyImage} />
            <View style={styles.emptyTextSec}>
              <Text style={styles.emptyTitle}>Su carrito se encuentra vacío</Text>
              <Text style={styles.emptySubtitle}>Agregue productos para comenzar a comprar</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headerProducts}>
            <Text style={styles.title}>Carrito</Text>
            <Text style={styles.subtitle}>
              ({CartData.length} {CartData.length === 1 ? "producto" : "productos"})
            </Text>
          </View>

          <View style={styles.listContainer}>
            <FlatList
              data={CartData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <CartItem cartItem={item} />
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          </View>

          <View style={styles.totalContainer}>
            <View style={styles.totalDetail}>
              <Image source={{ uri: "https://i.postimg.cc/DzTndGvw/icons8-recibo-48.png" }} style={styles.totalImage} />
              <View style={styles.totalDetailText}>
                <Text style={styles.subtotalText}>
                  Total: ${Number(total).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Pressable style={styles.confirmButton} onPress={onConfirmOrder} android_ripple={{ color: "#ff8c42" }}>
              <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="white" style={styles.confirmIcon} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyContent: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTextSec: {
    marginBottom: 30,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  shopButton: {
    backgroundColor: colors.orangeLogo,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  shopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f8ef",
  },
  headerProducts: {
    flexDirection: "row",
    alignItems: "center", // Asegura alineación vertical
    padding: 20,
    backgroundColor: colors.orangeLogo,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  goBackButton: {
    marginRight: 15,
    borderRadius: 8,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    lineHeight: 28, // Ajustar altura para coincidir con el subtitle
  },
  
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginLeft: 8,
    lineHeight: 28, // Igual al title para alinear bases
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  flatListContent: {
    paddingVertical: 15,
  },
  totalContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  totalImage: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  totalDetailText: {
    flex: 1,
  },
  subtotalText: {
    fontSize: 16,
    color: "#555",
  },
  divider: {
    height: 1,
    backgroundColor: "#eeeeee",
    marginVertical: 12,
  },
  totalRow: {
    marginBottom: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.orangeLogo,
    textAlign: "right",
  },
  confirmButton: {
    backgroundColor: colors.orangeLogo,
    borderRadius: 10,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmIcon: {
    marginLeft: 8,
  },
})

