import { StyleSheet, View, Image, Text, Pressable } from "react-native"
import { useDispatch } from "react-redux"
import { setCategorySelected } from "../features/shop/shopSlice"
import { useState } from "react"

const Categories = ({ categories, navigation }) => {
  const dispatch = useDispatch()
  const [imageError, setImageError] = useState(false);

  const handleNavigation = () => {
    dispatch(setCategorySelected(String(categories.categoria)));
    navigation.navigate("ItemListByCategory", { categories });
  }

  const getSafeValue = (value, defaultValue = '') => {
    return value !== null && value !== undefined ? String(value) : defaultValue;
  };

  console.log('Datos de categoría:', categories);

  return (
    <View style={styles.container}>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
        onPress={handleNavigation}
      >
        <View style={styles.content}>
          {!imageError ? (
            <Image 
              source={{ 
                uri: getSafeValue(categories.imagen),
                cache: 'force-cache'
              }} 
              style={styles.image}
              resizeMode="contain"
              onError={(error) => {
                console.log('Error de imagen:', error);
                setImageError(true);
              }}
              onLoad={() => console.log('Imagen cargada:', categories.imagen)}
            />
          ) : (
            <View style={styles.errorImageContainer}>
              <Text style={styles.errorText}>Error al cargar la imagen</Text>
            </View>
          )}
          <Text style={styles.text}>{getSafeValue(categories.categoria)}</Text>
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
  errorImageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
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

