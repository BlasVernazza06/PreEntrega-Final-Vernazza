import { View, Text, StyleSheet, Pressable } from "react-native"
import { useEffect } from "react"
import { useGetProductsByCategoryQuery } from "../services/shopService"
// Corregir la importación de FlatList
import { FlatList } from "react-native"
import CardItem from "../components/CardItem"

import { Ionicons } from "@expo/vector-icons"


const ItemListByCategory = ({ route, navigation }) => {
  const { categories } = route.params

  const {
    data: productsByCategory,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(categories.categoria)

  const handleNavigationBack = () => {
    navigation.goBack()
  }

  console.log(categories)


  return (
    <View style={styles.container}>
      <View style={styles.HeaderProducts}>
        <Pressable onPress={handleNavigationBack} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>{categories.categoria}</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={productsByCategory || []}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => <CardItem category={categories} products={item} navigation={navigation} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No hay productos disponibles en esta categoría</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  HeaderProducts:{
    flexDirection: 'row',
    alignItems:'center',
    padding: 20,
  },
  goBackButton:{
    marginRight: 25,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default ItemListByCategory

