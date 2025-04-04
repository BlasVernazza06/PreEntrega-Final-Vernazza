import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, TouchableOpacity } from 'react-native';
import { JosefinSans_400Regular_Italic } from '@expo-google-fonts/josefin-sans';
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { setIdSelected } from '../features/shop/shopSlice';

const CardItem = ({ products, navigation, category}) => {
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch()

  // Convertir los valores numéricos a string al inicio del componente
  const safeProducts = {
    ...products,
    precio: String(products.precio),
    stock: String(products.stock)
  };

  const handleNavigate = () => {
    dispatch(setIdSelected(safeProducts.title))
    navigation.navigate("Detail", {productId: safeProducts.id})
  }

  return (
    <Pressable onPress={handleNavigate}>
      <View style={styles.container}>
        {!imageError ? (
          <Image
            source={safeProducts.imagen}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.ImgMessageError}> 
            <Text>Imagen no disponible</Text> 
          </View>
        )}
        <View style={styles.infoProduct}>
          <Text style={styles.title} onLayout={() => {
            
          }}>
            {safeProducts.nombre}
          </Text>
          <Text style={styles.dateText}>
            {safeProducts.desde}
            {' al '}
            {safeProducts.hasta}
          </Text>
          {category && category.categoria !== "Actividades" && category.categoria !== "Autos" && (
            <View style={styles.subTitle}> 
              <Text>{safeProducts.origen}</Text>
              <Image
                source={require('../../assets/itemProducts/Flechas-Cards.svg')}
                style={styles.arrowImage} 
              />
              <Text>{safeProducts.destino}</Text>
            </View>
          )}
          <View style={styles.ButtonSec}>
            <Pressable
              style={styles.ButtonSeeMore}
              onPress={handleNavigate}>
              <Text style={styles.ButtonTextMore}>Ver Mas</Text>
            </Pressable>

            <Pressable style={styles.ButtonToCart}>
              <Text style={styles.ButtonTextCart}>Al Carrito</Text>
            </Pressable>
          </View>
          <Text style={styles.price}>
            ${Number(safeProducts.precio).toFixed(2)}
          </Text>
          <Text>{safeProducts.id}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fcf8f8',
    borderWidth: 1,
    borderColor: 'rgb(221, 225, 232)',
    margin: 10,
    padding: 0,
  },
  infoProduct: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'flex-start',
  },
  image: {
    width: 150,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    objectFit: 'contain',
  },
  ImgMessageError:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: JosefinSans_400Regular_Italic,
  },
  dateText: {
    marginVertical: 5,
  },
  subTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  arrowImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  ButtonSec: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    gap: 10,
  },
  ButtonSeeMore: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: colors.orangeLogo,
  },
  ButtonToCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orangeLogo,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: colors.orangeLogo,
  },
  ButtonTextMore:{
    color: colors.orangeLogo
  },
  ButtonTextCart:{
    color:'white'
  },
  price: {
    marginTop: 5,
  },
});

export default CardItem;