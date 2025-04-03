import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../global/colors"
import { usePostProfileImageMutation } from '../services/shopService'
import { useDispatch, useSelector } from 'react-redux'
import { setCameraImage } from '../features/user/userSlice'

const ImageSelector = ({navigation}) => {
     // Se crea un estado para la imagen.
     const [image, setImage] = useState(null)

     // Se obtiene la función para confirmar la imagen.
     const [triggerPostImage] = usePostProfileImageMutation()

     // Se obtiene el id del usuario.
     const {localId} = useSelector(state => state.auth.value)
     const dispatch = useDispatch()

     // Se verifica si se tiene permiso para usar la camara.
     const vefifyCameraPermissions = async () => {
          const { granted } = await ImagePicker.requestCameraPermissionsAsync()
          return granted
     }

     const pickImage = async () => {
          try {
               // Se verifica si se tiene permiso para usar la camara.
               const permissionCamera = await vefifyCameraPermissions()
               if(permissionCamera){
                    // Se lanza la camara.
                    let result = await ImagePicker.launchCameraAsync({
                         mediaTypes: ImagePicker.MediaTypeOptions.Images,
                         allowsEditing: true,
                         aspect: [1, 1],
                         base64: true,
                         quality: 0.2,
                    });

                    // Se verifica si se ha cancelado la imagen.
                    if(!result.canceled) {
                         // Se obtiene la imagen en base64.
                         const img = `data:image/jpg;base64,${result.assets[0].base64}`
                         setImage(img)
                    }
               }
          } catch (error) {
               console.log(error)
          }
     }
     
     // Se obtiene la función para confirmar la imagen.
     const confirmImage = () => {
          try {
               dispatch(setCameraImage(image))
               triggerPostImage({
                    image,
                    uid: localId
               })
               navigation.goBack()
          } catch(err) {
               console.log("Error al guardar la imagen:", err)
          }
     }
     
     return (
          <SafeAreaView style={styles.container} edges={['top']}>
               <View style={styles.HeaderProducts}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
                         <Ionicons name="arrow-back" size={24} color="black" />
                    </Pressable>
               </View>

               <View style={styles.content}>
                    <View style={styles.imageSection}>
                         {image ? (
                              <View style={styles.imageWrapper}>
                                   <Image 
                                        source={{uri: image}} 
                                        style={styles.image}
                                        resizeMode='cover'
                                   />
                              </View>
                         ) : (
                              <View style={styles.placeholderContainer}>
                                   <Text style={styles.placeholderEmoji}>📸</Text>
                                   <Text style={styles.placeholderText}>
                                        ¡Hora de la foto!
                                   </Text>
                                   <Text style={styles.placeholderSubtext}>
                                        Toca el botón para comenzar
                                   </Text>
                              </View>
                         )}
                    </View>

                    <View style={styles.buttonSection}>
                         {image ? (
                              <>
                                   <TouchableOpacity 
                                        style={[styles.button, styles.secondaryButton]}
                                        onPress={pickImage}
                                   >
                                        <Text style={styles.secondaryButtonText}>
                                             📸 Nueva foto
                                        </Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                        style={[styles.button, styles.primaryButton]}
                                        onPress={confirmImage}
                                   >
                                        <Text style={styles.primaryButtonText}>
                                             ✨ ¡Me gusta!
                                        </Text>
                                   </TouchableOpacity>
                              </>
                         ) : (
                              <TouchableOpacity 
                                   style={[styles.button, styles.primaryButton]}
                                   onPress={pickImage}
                              >
                                   <Text style={styles.primaryButtonText}>
                                        📸 Tomar foto
                                   </Text>
                              </TouchableOpacity>
                         )}
                    </View>
               </View>
          </SafeAreaView>
     )
}

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
          height: 70,
     },
     goBackButton:{
          marginRight: 25,
     },
     title:{
          fontSize: 30,
          fontWeight: 'bold'
     },
     backButton: {
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
     },
     backText: {
          fontSize: 24,
          color: colors.white,
     },
     content: {
          flex: 1,
          padding: 20,
          justifyContent: 'space-between',
          backgroundColor: colors.lightGray + '10',
     },
     imageSection: {
          alignItems: 'center',
          marginTop: 30,
          backgroundColor: colors.white,
          padding: 20,
          borderRadius: 20,
          marginHorizontal: 10,
     },
     imageWrapper: {
          padding: 3,
          backgroundColor: colors.orangeLogo,
          borderRadius: 25,
     },
     image: {
          width: 300,
          height: 300,
          borderRadius: 22,
          borderWidth: 3,
          borderColor: colors.white,
     },
     placeholderContainer: {
          width: 300,
          height: 300,
          borderRadius: 25,
          backgroundColor: colors.orangeLogo + '10',
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: colors.orangeLogo,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
     },
     placeholderEmoji: {
          fontSize: 50,
          marginBottom: 15,
     },
     placeholderText: {
          fontSize: 24,
          fontWeight: '600',
          color: colors.primary,
          textAlign: 'center',
          marginBottom: 8,
     },
     placeholderSubtext: {
          fontSize: 16,
          color: colors.lightBlack,
          textAlign: 'center',
     },
     buttonSection: {
          gap: 12,
          marginBottom: 20,
          paddingHorizontal: 10,
     },
     button: {
          padding: 18,
          borderRadius: 15,
          alignItems: 'center',
     },
     primaryButton: {
          backgroundColor: colors.orangeLogo,
          borderWidth: 0,
     },
     secondaryButton: {
          backgroundColor: colors.orangeLogo + '15',
          borderWidth: 1,
          borderColor: colors.orangeLogo,
     },
     primaryButtonText: {
          color: colors.white,
          fontSize: 18,
          fontWeight: '600',
     },
     secondaryButtonText: {
          color: colors.orangeLogo,
          fontSize: 18,
          fontWeight: '600',
     },
})

export default ImageSelector