import { View, Text, Pressable, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
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

    // Se obtiene la función para iniciar sesión.
    const [triggerSignIn, result] = useSignInMutation();

    // Se crea un estado para el correo electrónico.
    const [email, setEmail] = useState();

    // Se crea un estado para la contraseña.
    const [password, setPassword] = useState();

    // Se crea un estado para la visibilidad de la contraseña.
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Se crea un estado para el error del correo electrónico.
    const [emailError, setEmailError] = useState('');

    // Se crea un estado para el error de la contraseña.
    const [passwordError, setPasswordError] = useState('');

    // Se obtiene la función para insertar la sesión.
    const {insertSession} = useDB();

    // Se obtiene la función para iniciar sesión.
    const onSubmit = async () => {
        try {
            // Se obtiene el resultado de la función para iniciar sesión.
            const result = await triggerSignIn({ email, password }).unwrap();
            
            // Se verifica si el sistema operativo no es web.
            if(Platform.OS !== 'web'){
                // Se inserta la sesión.
                insertSession({
                    email: result.email,
                    localId: result.localId,
                    token: result.idToken,
                });
            }
            
            dispatch(
                // Se establece el usuario.
                setUser({
                    email: result.email,
                    idToken: result.idToken,
                    localId: result.localId,
                })
            );

            // Se limpia el correo electrónico y la contraseña.
            setEmail('');
            setPassword('');

            Alert.alert(
                "Inicio de sesión exitoso",
                "¡Bienvenido!",
                [{ text: "OK" }]
            );

        } catch (error) {
            // Se muestra el error.
            console.log('Error en el catch:', error);

            // Se verifica el tipo de error.
            switch(error.type) {
                case 'email':
                    // Se establece el error del correo electrónico.
                    setEmailError(error.message);
                    Alert.alert(
                        "Error de correo",
                        error.message,
                        [{ text: "OK" }]
                    );
                    break;

                case 'password':
                    // Se establece el error de la contraseña.
                    setPasswordError(error.message);
                    Alert.alert(
                        "Error de contraseña",
                        error.message,
                        [{ text: "OK" }]
                    );
                    break;

                case 'credentials':
                    // Se establece el error de las credenciales.
                    setEmailError(error.message);
                    setPasswordError(error.message);
                    Alert.alert(
                        "Error de credenciales",
                        error.message,
                        [{ text: "OK" }]
                    );
                    break;

                default:
                    // Se muestra un error por defecto.
                    Alert.alert(
                        "Error",
                        error.message || "Error al iniciar sesión",
                        [{ text: "OK" }]
                    );
            }
        }
    };
     
    return (
          <SafeAreaView style={styles.main} edges={['top']}>
              <LinearGradient
                    colors={["rgba(253, 155, 64, 0.6)", "rgba(253, 155, 64, 0.8)", "#fd9b40"]}
                    start={{ x: 0.5, y: -0.2 }}
                    end={{ x: 0.5, y: 2 }}
                    style={styles.background}
                    >
                    {/* Contenedor del logo y texto */}
                    <View style={styles.logoContainer}>
                         <View style={styles.logoCircle}>
                              <Ionicons name="airplane" size={45} color="#fd9b40" style={styles.logo}/>
                         </View>
                         <Text style={styles.logoText}>AeroViajes</Text>
                    </View>
               </LinearGradient>
               <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <View style={styles.inputContainer}>
                        <InputForm 
                            onChange={setEmail} 
                            placeholderText={"Correo Electrónico"} 
                        />
                        <View style={styles.passwordContainer}>
                            <InputForm  
                                onChange={setPassword} 
                                isSecure={!isPasswordVisible} 
                                placeholderText={"Contraseña"} 
                                style={{ paddingRight: 50 }}
                            />
                            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                                <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#000" />
                            </Pressable>
                        </View>
                    </View>
                    
                    <SubmitButton title={'Enviar'} onPress={onSubmit} />
                    
                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>o</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.noAccountSec}>
                         <Text style={styles.noAccountText}>¿No tienes una cuenta? </Text>
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
            top: "10%",
            alignSelf: "center",
            alignItems: "center",
            zIndex: 5,
        },
        logoCircle: {
            backgroundColor: 'white',
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        logo: {
            transform: [{ rotate: '45deg' }]
        },
        logoText: {
            fontSize: 28,
            fontWeight: "bold",
            color: "#fff",
            marginTop: 15,
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 3
        },
        container: {
            width: "100%",
            height: height * 0.6,
            backgroundColor: colors.headerWhite,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: "center",
            paddingVertical: 40,
            paddingHorizontal: 25,
            elevation: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 5,
        },
        title: {
            fontSize: 32,
            fontWeight: "bold",
            fontFamily: "Josefin",
            marginBottom: 35,
            color: colors.darkText,
        },
        inputContainer: {
            width: '100%',
            gap: 15,
            marginBottom: 30,
        },
        passwordContainer: {
            width: '100%',
            position: 'relative',
        },
        eyeIcon: {
            position: 'absolute',
            top: '62%',
            right: 25,
            transform: [{ translateY: -12 }],
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        dividerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%',
            marginVertical: 25,
        },
        divider: {
            flex: 1,
            height: 1,
            backgroundColor: '#ddd',
        },
        dividerText: {
            paddingHorizontal: 15,
            color: '#666',
            fontSize: 16,
        },
        noAccountSec: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
        },
        noAccountText: {
            fontSize: 15,
            color: '#444',
        },
        NavigateButtonText: {
            color: "#fd9b40",
            fontWeight: "bold",
            fontSize: 15,
        },
});
  