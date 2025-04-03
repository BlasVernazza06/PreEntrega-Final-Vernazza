import React from 'react'
import { Image,  StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Pressable, Alert} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { colors } from '../global/colors'
import { useGetAllOrdersQuery } from '../services/shopService'
import { Ionicons } from "@expo/vector-icons"

import OrderCard from '../components/OrderCard'
import { useGetProfileImageQuery } from '../services/shopService'
import { useDB } from '../hooks/useDB'
import { clearUser } from '../features/user/userSlice'

const MyProfile = ({navigation}) => {
     // Se obtiene el usuario, la imagen de la camara, el id del usuario y el usuario.
     const {imageCamera, localId, user} = useSelector(state => state.auth.value)

     // Se obtiene la imagen de la base de datos.
     const {data: imageFromBase} = useGetProfileImageQuery(localId)
     
     // Se obtiene las ordenes de la base de datos.
     const {data: orders, isLoading} = useGetAllOrdersQuery()

     // Se obtiene la función para cerrar la sesión.
     const {closeSession} = useDB()

     // Se obtiene el dispatch.
     const dispatch = useDispatch()

     // Transformar los datos para obtener los items
     const orderItems = orders ? Object.values(orders).flatMap(order => order.items ? order.items : []) : [];

     const defaultImageRoute = "../../assets/Images/DefaultImageProfile.png"

     return (
     <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
          <View style={styles.HeaderProducts}>
            <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styles.profileSection}>
               <View style={styles.imageContainer}>
                    {imageFromBase || imageCamera ? 
                         <Image 
                              source={{uri: imageFromBase?.image || imageCamera}}
                              style={styles.image}
                              resizeMode='cover'
                         />
                         : 
                         <Image 
                              source={require(defaultImageRoute)}
                              style={styles.image}
                              resizeMode='cover'
                         />
                    }
               </View>
               <View style={styles.userInfoContainer}>
                    <Text style={styles.userEmail}>{user}</Text>
                    <TouchableOpacity 
                         style={styles.editProfileButton}
                         onPress={() => navigation.navigate('ImageSelector')}
                    >
                         <Text style={styles.editProfileText}>Editar perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                         style={styles.closeSessionButton}
                         onPress={async () => {
                              await closeSession();
                              dispatch(clearUser());
                              Alert.alert(
                                   "Cierre de sesión exitoso",
                                   "¡Hasta luego!",
                                   [{ text: "OK" }]
                              );
                         }}
                    >
                         <Text style={styles.closeSessionText}>Cerrar sesión</Text>
                    </TouchableOpacity>
               </View>
          </View>

          <View style={styles.infoSection}>
               <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                         <Text style={styles.infoTitle}>Órdenes</Text>
                         <Text style={styles.infoSubtitle}>Historial de compras</Text>
                    </View>
                    <FlatList
                         data={orderItems}
                         keyExtractor={(item, index) => index.toString()}
                         showsVerticalScrollIndicator={false}
                         contentContainerStyle={styles.ordersList}
                         ListEmptyComponent={
                              <Text style={styles.emptyText}>No tienes órdenes todavía</Text>
                         }
                         renderItem={({ item }) => (
                              <OrderCard orderData={item}/>
                         )}
                    />
               </View>
          </View>
     </SafeAreaView>
     )
}

export default MyProfile

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: colors.white,
     },
      HeaderProducts:{
        backgroundColor: colors.orangeLogo,
        flexDirection: 'row',
        alignItems:'center',
        padding: 20,
        height: 100,
      },
      goBackButton:{
          paddingTop: 20,
        marginRight: 25,
      },
      title:{
        fontSize: 30,
        fontWeight: 'bold'
      },
      profileSection: {
            alignItems: 'center',
            paddingVertical: 20,
      },
     imageContainer: {
          padding: 3,
          backgroundColor: colors.white,
          borderRadius: 75,
          shadowColor: colors.lightBlack,
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          elevation: 5,
     },
     image: {
          width: 140,
          height: 140,
          borderRadius: 70,
          borderWidth: 3,
          borderColor: colors.primary,
     },
     userName: {
          fontSize: 24,
          fontWeight: '600',
          color: colors.primary,
          marginTop: 15,
     },
     userInfoContainer: {
          alignItems: 'center',
          marginTop: 10,
     },
     userEmail: {
          fontSize: 16,
          color: colors.lightBlack,
          marginBottom: 10,
     },
     editProfileButton: {
          backgroundColor: colors.white,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: colors.primary,
          marginBottom: 10,
     },
     editProfileText: {
          color: colors.primary,
          fontSize: 14,
          fontWeight: '500',
     },
     closeSessionButton: {
          backgroundColor: "red",
          padding:10,
          paddingHorizontal: 12,
          borderRadius: 15,
     },
     closeSessionText: {
          color: 'white',
          fontSize: 14,
          fontWeight: '500',
     },
     infoSection: {
        flex: 1,
        paddingHorizontal: 20,
     },
     infoCard: {
          borderRadius: 20,
          padding: 10,

     },
     infoHeader: {
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.lightGray,
          paddingBottom: 15,
     },
     infoTitle: {
          fontSize: 22,
          fontWeight: '700',
          color: colors.primary,
          marginBottom: 5,
     },
     infoSubtitle: {
          fontSize: 14,
          color: colors.lightBlack,
     },
     ordersList: {
          gap: 10,
     },
     emptyText: {
          textAlign: 'center',
          color: colors.lightBlack,
          fontSize: 16,
          marginTop: 20,
     },
});