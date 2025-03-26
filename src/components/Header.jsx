import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../global/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AeroViajes
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    paddingVertical: 15,
    backgroundColor: colors.orangeLogo,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightOrange || '#f9a600', // Puedes cambiar este color
  },
  title: {
    fontSize: 28, // Aumentar el tamaño del texto
    fontWeight: 'bold',
    color: '#ffffff', // Color blanco para el texto
    textAlign: 'center', // Centrar texto
  },
});

export default Header;
