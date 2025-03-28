import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '../global/colors'

import AddButton from '../components/AddButton'
import { useGetProfileImageQuery } from '../services/shopService'

const MyProfile = ({navigation}) => {

     const {imageCamera, localId, user} = useSelector(state => state.auth.value)
     const {data: imageFromBase} = useGetProfileImageQuery(localId)

     const launchCamera = () => {
          navigation.navigate('ImageSelector')
     }

     const defaultImageRoute = "../../assets/Images/DefaultImageProfile.png"

     return (
     <SafeAreaView style={styles.container} edges={['top']}>
          <View style={styles.profileHeader}>
               {imageFromBase || imageCamera ? 
               (
                    <Image 
                    source={{uri: imageFromBase?.image || imageCamera}}
                    style={styles.image}
                    resizeMode='cover'
                    />
               ) 
               : 
               (      
                    <Image 
                    source={require(defaultImageRoute)}
                    style={styles.image}
                    resizeMode='cover'
                    />
               )}
               <Text style={styles.emailText}>{user}</Text>
          </View>

          <View style={styles.profileContent}>
               <TouchableOpacity 
                    style={styles.editButton}
                    onPress={launchCamera}
               >
                    <Text style={styles.editButtonText}>Cambiar foto de perfil</Text>
               </TouchableOpacity>

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
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: colors.white,
    marginBottom: 15,
  },
  emailText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  profileContent: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  editButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: colors.lightBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.lightBlack,
  },
  infoValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});