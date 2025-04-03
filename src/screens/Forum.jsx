import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'

const Forum = () => {
  // Se crea un array de casos de viaje.
  const travelCases = [
    {
      name: "Viaje a Cancún",
      description: "Tuve una experiencia increíble en Cancún. La app me ayudó a encontrar las mejores ofertas y a planificar mi itinerario.",
      benefits: "Ahorro en costos y fácil acceso a información.",
      image: require('../../assets/itemProducts/HotelCancun.jpg'), // Reemplaza con la imagen de tu base de datos
      userImage: require('../../assets/ProfileImages/ProfileImage1.jpg'), // Imagen circular de usuario
    },
    {
      name: "Escapada a París",
      description: "Visité los lugares más emblemáticos de París gracias a las recomendaciones de la app. ¡Fue un viaje inolvidable!",
      benefits: "Recomendaciones personalizadas y atención al cliente excelente.",
      image: require('../../assets/itemProducts/Francia-Foto6.jpg'), // Reemplaza con la imagen de tu base de datos
      userImage: require('../../assets/ProfileImages/ProfileImage2.jpg'), // Imagen circular de usuario
    },
    {
      name: "Aventura en Nueva York",
      description: "La app me ayudó a descubrir actividades únicas en Nueva York. ¡No me perdí de nada!",
      benefits: "Acceso a descuentos exclusivos y guías locales.",
      image: require('../../assets/itemProducts/VueloNuevaYork.jpg'), // Reemplaza con la imagen de tu base de datos
      userImage: require('../../assets/ProfileImages/ProfileImage3.jpg'), // Imagen circular de usuario
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Foro de Viajes</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {travelCases.map((travel, index) => (
          <View key={index} style={styles.caseContainer}>
            <Image source={travel.image} style={styles.destinationImage} />
            <View style={styles.userImageContainer}>
              <Image source={travel.userImage} style={styles.userImage} />
            </View>
            <View style={styles.caseContent}>
               <Text style={styles.caseTitle}>{travel.name}</Text>
               <Text style={styles.caseDescription}>{travel.description}</Text>
               <Text style={styles.caseBenefits}>Beneficios: {travel.benefits}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Forum

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  caseContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    elevation: 2,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  userImageContainer: {
    position: 'absolute',
    top: 180, // Ajusta según la altura de la imagen
    left: 15, // Ajusta según el diseño
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userImage: {
    width: 50,
    height: 50,
  },
  caseContent: {
     paddingTop: 20,
  },
  caseTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  caseDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  caseBenefits: {
    fontSize: 14,
    color: '#007BFF',
  },
})