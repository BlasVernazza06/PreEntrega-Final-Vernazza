import { StyleSheet, View, Image, Text, Pressable } from "react-native"
import { useDispatch } from "react-redux"
import { setCategorySelected } from "../features/shop/shopSlice"

const Categories = ({ categories, navigation }) => {
  
  const dispatch = useDispatch()

  const handleNavigation = () => {
    dispatch(setCategorySelected(categories.categoria));
    navigation.navigate("ItemListByCategory", { categories });
  }


  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleNavigation}>
        <View style={styles.content}>
          <Image source={categories.imagen} style={styles.image} />
          <Text style={styles.text}>{categories.categoria}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    padding: 5,
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonPressed: {
    backgroundColor: "#f8f8f8",
    shadowOpacity: 0.05,
    elevation: 1,
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
})

export default Categories

