"use client"

import { useState } from "react"
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native"
import { useGetCategoriesQuery } from "../services/shopService"
import Header from "../components/Header"
import Categories from "../components/Categories"

const screenWidth = Dimensions.get("window").width

const HomePage = ({ navigation }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery()

  // Función para determinar el estilo de cada fila basado en su índice
  const getColumnWrapperStyle = (index) => {
    if (!categories) return styles.categoryRow

    // Calcular si estamos en la última fila y si hay un número impar de categorías
    const totalItems = categories.length
    const isOdd = totalItems % 2 !== 0
    const lastRowIndex = Math.floor((totalItems - 1) / 2)

    // Si es la última fila y hay un número impar de categorías, centrar el elemento
    if (isOdd && index === lastRowIndex) {
      return [styles.categoryRow, styles.lastOddRow]
    }

    return styles.categoryRow
  }

  return (
    <>
      {isLoading ? (
        null
      ) : (
        <>
          <Header />
          <View style={styles.main}>
            <Text style={styles.title}>¡Selecciona una de nuestras categorias disponibles!</Text>
            <View style={styles.categoriesWrapper}>
              <FlatList
                vertical
                data={categories}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={({ index }) => getColumnWrapperStyle(index)}
                contentContainerStyle={styles.categoriesContainer}
                renderItem={({ item, index }) => {
                  // Determinar si este es el último elemento en un conjunto impar
                  const isLastItemInOddSet =
                    categories && categories.length % 2 !== 0 && index === categories.length - 1

                  return (
                    <View style={[styles.categoryItem, isLastItemInOddSet && styles.lastOddItem]}>
                      <Categories categories={item} navigation={navigation} />
                    </View>
                  )
                }}
              />
            </View>
          </View>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Color del texto más oscuro para mejor contraste
  },
  categoriesWrapper: {
    width: "90%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  categoriesContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center", // Asegura que todo el contenido esté centrado
  },
  categoryRow: {
    width: "100%",
    justifyContent: "space-evenly", // Distribuye el espacio uniformemente
    paddingHorizontal: 10, // Añade un poco de padding horizontal
  },
  lastOddRow: {
    justifyContent: "center", // Centra el último elemento
    width: "100%",
  },
  categoryItem: {
    width: screenWidth * 0.4, // 40% del ancho de la pantalla
    height: 120,
    marginBottom: 20,
    alignItems: "center", // Centra el contenido dentro del item
  },
  lastOddItem: {
    // El último elemento impar mantiene el mismo ancho pero se asegura de estar centrado
    width: screenWidth * 0.4,
  },
})

export default HomePage

