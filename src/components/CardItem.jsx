import { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text, TouchableOpacity } from 'react-native';
import { JosefinSans_400Regular_Italic } from '@expo-google-fonts/josefin-sans';
import { colors } from '../global/colors';
import { useDispatch } from 'react-redux';
import { setIdSelected } from '../features/shop/shopSlice';

const CardItem = ({ products, navigation, category}) => {
  const [imageError, setImageError] = useState(false);

  const dispatch = useDispatch()

  // Función de utilidad para convertir valores seguros a string
  const safeToString = (value) => {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  const handleNavigate = () => {
    dispatch(setIdSelected(safeToString(products.title)))
    navigation.navigate("Detail", {productId: safeToString(products.id)})
  }

  return (
    <Pressable onPress={handleNavigate}>
      <View style={styles.container}>
        {!imageError ? (
          <Image
            source={products.imagen}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.ImgMessageError}> 
            <Text>Imagen no disponible</Text> 
          </View>
        )}
        <View style={styles.infoProduct}>
          <Text style={styles.title}>
            {safeToString(products.nombre) || 'Nombre no disponible'}
          </Text>
          <Text style={styles.dateText}>
            <Text style={{fontWeight: 'bold'}}>
              {safeToString(products.desde) || 'Desde no disponible'}
            </Text>
            {' al '}
            <Text style={{fontWeight: 'bold'}}>
              {safeToString(products.hasta) || 'Hasta no disponible'}
            </Text>
          </Text>
          {category && category.categoria !== "Actividades" && category.categoria !== "Autos" && (
            <View style={styles.subTitle}> 
              <Text>{safeToString(products.origen) || 'Origen no disponible'}</Text>
              <Image
                source={require('../../assets/itemProducts/Flechas-Cards.svg')}
                style={styles.arrowImage} 
              />
              <Text>{safeToString(products.destino) || 'Destino no disponible'}</Text>
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
  }
});

export default CardItem;