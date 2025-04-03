import { StyleSheet, Text, View, Pressable, Dimensions, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../global/colors";

import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';

import { signupSchema } from '../validations/singupSchema'
import InputForm from '../components/Input'
import SubmitButton from '../components/SubmitButton'

const { height } = Dimensions.get('window');

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMail, setErrorMail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  
    const dispatch = useDispatch();

    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(() => {
        if(result.isSuccess) {
            dispatch(setUser({
                user: result.data.username,
                email: result.data.email,
                idToken: result.data.idToken,
                localId: result.data.localId
            }));
            Alert.alert("Registro exitoso", "¡Bienvenido a AeroViajes!", 
            [{ text: "OK"}]);
        }
    }, [result])

    // Se obtiene la función para registrar un usuario.
    const onSubmit = () => {
        try {
            // Se limpia el error del correo electrónico.
            setErrorMail('')
            // Se limpia el error de la contraseña.
            setErrorPassword('')
            // Se limpia el error de la confirmación de la contraseña.
            setErrorConfirmPassword('')
            // Se valida el formulario.
            signupSchema.validateSync({
                email, password, confirmPassword
            })
            // Se registra el usuario.
            triggerSignUp({ email, password, returnSecureToken: true})
        }catch (error) {
            // Se verifica el error.
            switch(error.path) {
                case 'email':
                    // Se establece el error del correo electrónico.
                    setErrorMail(error.message)
                    break;
                case 'password':
                    // Se establece el error de la contraseña.
                    setErrorPassword(error.message)
                    break;
                case 'confirmPassword':
                    // Se establece el error de la confirmación de la contraseña.
                    setErrorConfirmPassword(error.message)
                    break;
                default:
                    console.error("Error inesperado:", error);
                    Alert.alert("Error", "Ocurrió un error inesperado. Inténtalo de nuevo.");
            }
        }
    }

     return (
        <SafeAreaView style={styles.main} edges={['top']}>
            <LinearGradient
                colors={["rgba(253, 155, 64, 0.6)", "rgba(253, 155, 64, 0.8)", "#fd9b40"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.background}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="airplane" size={45} color="#fd9b40" style={styles.logo}/>
                    </View>
                    <Text style={styles.logoText}>AeroViajes</Text>
                </View>
            </LinearGradient>
            <View style={styles.container}>
                <View style={styles.formHeader}>
                    <Text style={styles.title}>Crear Cuenta</Text>
                    <Text style={styles.subtitle}>¡Únete a nuestra comunidad de viajeros!</Text>
                </View>
                
                <View style={styles.inputsContainer}>
                    <InputForm 
                        onChange={setEmail} 
                        placeholderText={"Correo Electrónico"}
                        error={errorMail}
                    />
                    <InputForm
                        onChange={setPassword}
                        error={errorPassword}
                        isSecure={true}
                        placeholderText={"Contraseña"}
                    />
                    <InputForm
                        onChange={setConfirmPassword}
                        error={errorConfirmPassword}
                        isSecure={true}
                        placeholderText={"Confirmar Contraseña"}
                    />
                </View>

                <SubmitButton title="Comenzar Aventura" onPress={onSubmit} />

                <View style={styles.footer}>
                    <View style={styles.dividerContainer}>
                        <View style={[styles.divider, { backgroundColor: '#fd9b40' }]} />
                        <View style={styles.circleDivider}>
                            <Ionicons name="compass" size={20} color="#fd9b40" />
                        </View>
                        <View style={[styles.divider, { backgroundColor: '#fd9b40' }]} />
                    </View>

                    <View style={styles.haveAccountSec}>
                        <Text style={styles.haveAccountText}>¿Ya eres viajero? </Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.NavigateButtonText}>Inicia Sesión</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Signup

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
        height: height * 0.75,
        backgroundColor: colors.headerWhite,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 25,
        elevation: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    formHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        fontFamily: "Josefin",
        color: colors.darkText,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        fontFamily: "Josefin",
    },
    inputsContainer: {
        width: '100%',
        marginBottom: 25,
    },
    footer: {
        width: '100%',
        marginTop: 'auto',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1.5,
    },
    circleDivider: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    haveAccountSec: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    haveAccountText: {
        fontSize: 16,
        color: '#666',
    },
    NavigateButtonText: {
        color: "#fd9b40",
        fontWeight: "bold",
        fontSize: 16,
    },
});