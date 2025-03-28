import { View, Text, Pressable, StyleSheet, Dimensions, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

import InputForm from '../components/Input';
import SubmitButton from '../components/SubmitButton';

import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';
import { colors } from '../global/colors';
import { useDB } from '../hooks/useDB';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    };
     
    return (
          <SafeAreaView style={styles.main} edges={['top']}>
              <LinearGradient
                    colors={["rgba(255, 153, 0, 0.6)", "rgba(255, 153, 0, 0.8)", "rgba(255, 153, 0, 1)"]}
                    start={{ x: 0.5, y: -0.2 }}
                    end={{ x: 0.5, y: 2 }}
                    style={styles.background}
                    >
                    {/* Contenedor del logo y texto */}
                    <View style={styles.logoContainer}>
                         <Ionicons name="airplane" size={45} color="black" style={styles.logo}/>
                         <Text style={styles.logoText}>AeroViajes</Text>
                    </View>
               </LinearGradient>
               <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <InputForm 
                         onChange={setEmail} 
                         placeholderText={"Correo Electrónico"} 
                    />
                    <InputForm  
                         onChange={setPassword} 
                         isSecure={!isPasswordVisible} 
                         placeholderText={"Contraseña"} 
                    />
                    <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                         <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                    </Pressable>
                    <SubmitButton title={'Enviar'} onPress={onSubmit} />
                    <View style={styles.divider} />
                    <View style={styles.noAccountSec}>
                         <Text>No tienes una cuenta? </Text>
                         <Pressable onPress={() => navigation.navigate("Register")} >
                              <Text style={styles.NavigateButtonText}>Regístrate</Text>
                         </Pressable>
                    </View>
               </View>
          </SafeAreaView>
    );
  };
  
  export default Login;
  
const styles = StyleSheet.create({
      main: {
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
      },
      background: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          justifyContent: 'center',
          alignItems: 'center',
      },
      logoContainer: {
          position: "absolute",
          top: "10%", // Ajusta la altura según sea necesario
          alignSelf: "center",
          flexDirection: "column", // Apila el avión sobre el texto
          alignItems: "center", // Centra los elementos
          zIndex: 5,
      },
      logo: {
          fontSize: 50, // Aumenta el tamaño del avión
          marginBottom: 5, // Espacio entre el avión y el texto
      },
      logoText: {
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
      },
      container: {
          width: "100%",
          height: height * 0.6,
          backgroundColor: colors.headerWhite,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignItems: "center",
          paddingVertical: 30,
          paddingHorizontal: 25,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.15,
          shadowRadius: 5,
      },
      title: {
          fontSize: 28,
          fontWeight: "bold",
          fontFamily: "Josefin",
          marginBottom: 25,
          color: colors.darkText,
      },
      eyeIcon: {
          position: 'absolute',
          top: '30%',
          right: 60,
      },
      divider: {
          width: "80%",
          borderBottomColor: "#ddd",
          borderWidth: 0.7,
          marginVertical: 15,
      },
      noAccountSec: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
      },
      NavigateButtonText: {
          color: "#ff9900",
          fontWeight: "600",
      },
});
  