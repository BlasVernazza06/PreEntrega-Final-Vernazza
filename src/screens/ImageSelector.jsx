import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import * as ImagePicker from 'expo-image-picker';

import { colors } from "../global/colors";
import { usePostProfileImageMutation } from '../services/shopService';
import { useDispatch, useSelector } from 'react-redux';
import {setCameraImage} from '../features/user/userSlice'

const ImageSelector = ({navigation}) => {

     const [image, setImage] = useState(null)
     const [triggerPostImage, result] = usePostProfileImageMutation()

     const {localId} = useSelector(state => state.auth.value)
     console.log(localId)

     const dispatch = useDispatch()

     const vefifyCameraPermissions = async () => {
          // verificar permisos de camara
          const { granted } = await ImagePicker.requestCameraPermissionsAsync()
          return granted
     }

     const pickImage = async () => {
          // seleccionar una imagen
          try {
          const permissionCamera = await vefifyCameraPermissions()
          if(permissionCamera){
          let result = await ImagePicker.launchCameraAsync({
               mediaTypes: (ImagePicker.MediaType = ['images', 'videos']),
               allowsEditing: true,
               aspect: [1, 1],
               base64: true,
               quality: 0.2,
          });

          console.log(result)

          if(!result.canceled) {
               const img = `data:image/jpg;base64,${result.assets[0].base64}`
               setImage(img)
          }
          }
          } catch (error) {
          console.log(error)
          }
     }
     
     const confirmImage = () => {
          // guardar la imagen
          
          try {
          dispatch(setCameraImage(image))
          triggerPostImage({image, localId})
          navigation.goBack()
          } catch(err) {
          console.log(err)
          }

     }
     
     
     return (
     <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.header}>
               <Text style={styles.title}>Foto de Perfil</Text>
               <Text style={styles.subtitle}>Toma una foto para tu perfil</Text>
          </View>

          <View style={styles.imageContainer}>
               {image ? 
               (
                    <>
                    <Image 
                         source={{uri: image}} 
                         style={styles.image}
                         resizeMode='cover'
                    />
                    <View style={styles.buttonContainer}>
                         <TouchableOpacity 
                              style={[styles.button, styles.retakeButton]}
                              onPress={pickImage}
                         >
                              <Text style={styles.buttonText}>Tomar otra foto</Text>
                         </TouchableOpacity>
                         <TouchableOpacity 
                              style={[styles.button, styles.confirmButton]}
                              onPress={confirmImage}
                         >
                              <Text style={styles.buttonText}>Confirmar foto</Text>
                         </TouchableOpacity>
                    </View>
                    </>
               ) 
               : 
               (
                    <>
                         <View style={styles.noPhotoContainer}>
                              <Text style={styles.noPhotoText}>No hay foto para mostrar...</Text>
                         </View>
                         <TouchableOpacity 
                              style={[styles.button, styles.takePhotoButton]}
                              onPress={pickImage}
                         >
                              <Text style={styles.buttonText}>Tomar foto</Text>
                         </TouchableOpacity>
                    </>
               )}
          </View>
     </SafeAreaView>
     )
}

export default ImageSelector

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  noPhotoContainer: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGray,
  },
  noPhotoText: {
    fontSize: 16,
    color: colors.lightBlack,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  takePhotoButton: {
    backgroundColor: colors.primary,
  },
  retakeButton: {
    backgroundColor: colors.lightBlack,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});