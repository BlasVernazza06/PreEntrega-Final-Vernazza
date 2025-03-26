import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { getProducts } from './src/data/data';
import Loader from './src/components/loader';
import Navigator from './src/Navigation/Navigator';
import { colors } from './src/global/colors';
import { Provider } from 'react-redux';
import store from "./src/store"

export default function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res))
      .catch((error) => {
        console.error(error);
        setError("Error al cargar los productos."); // Actualizar el estado de error
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text> // Mostrar mensaje de error
          ) : (
            <Provider store={store}>
              <Navigator products={products} />
            </Provider>
          )}
        </SafeAreaView>
      )}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.backgroundGray,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});
