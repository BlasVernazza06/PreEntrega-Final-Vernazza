import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons"

import InputForm from '../components/Input'
import SubmitButton from '../components/SubmitButton'

import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';
import { colors } from '../global/colors';

const Login = ({ navigation }) => {
     
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {insertSession} = useDB();

 useEffect(() => {
   if (result.isSuccess) {
    (async () => {
      try {
        if(Platform.OS !== 'web'){
        insertSession({
          email: result.data.email,
          localId: result.data.localId,
          token: result.data.idToken,
        });
        }
        dispatch(
          setUser({
            email: result.data.email,
            idToken: result.data.idToken,
            localId: result.data.localId,
          })
        );
      } catch(err) {
        console.log(err)
      }
    })()
   }
 }, [result]);


    const onSubmit = () => {
      triggerSignIn({ email, password });
      console.log("login")
    };
     
     return (
          <View style={styles.main}>
               <LinearGradient
                    colors={["rgba(255, 209, 148, 0.6)", "rgba(255, 209, 148, 0.6)", "rgba(248, 219, 165, 0)"]}
                    start={{ x: 0.5, y: -0.2 }}
                    end={{ x: 0.5, y: 2 }}
                    style={styles.background}
               />
               <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesion</Text>
                    <InputForm 
                         label={"email"} 
                         onChange={setEmail}
                         placeholderText={"Correo Electronico"}
                    />
                    <InputForm 
                         label={"contraseña"}
                         onChange={setPassword}
                         isSecure={!isPasswordVisible}
                         placeholderText={"Ingrese su contraseña"}
                    
                    />
                    <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                         <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                    </Pressable>
                    <SubmitButton
                         title={'Enviar'}
                         onPress={onSubmit}
                    
                    ></SubmitButton>

                    <View style={styles.divider}>
                    </View>
                    
                    <View style={styles.noAccountSec}>
                         <Text>No tienes una cuenta? </Text>
                         <Pressable onPress={() => navigation.navigate("Register")} >
                              <Text style={styles.NavigateButtonText}>Registrate</Text>
                         </Pressable>
                    </View>
               </View>
          </View>
     )
}

export default Login

const styles = StyleSheet.create({
     main: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
     },
     background: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
     },
     container: {
          width: "90%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.headerWhite,
          gap: 25,
          paddingVertical: 20,
          borderRadius: 10,
          boxShadow: 12,
          
     },
     title:{
          fontSize: 25,
          fontWeight: 'semibold',
          fontFamily: "Josefin",
     },
     eyeIcon:{
          position: 'absolute',
          top: '49%',
          left: '85%',
     },
     divider:{
          justifyContent:'center',
          alignContent:'center',
          width: '70%',
          borderBottomColor: '#ddd',
          borderWidth: 0.5,
     },
     noAccountSec:{
          flex: 1,
          flexDirection: 'row',
          justifyContent:'center',
          alignContent:'center'
     },
     NavigateButtonText:{
          color: 'blue'
     },
});