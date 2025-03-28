import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from "../global/colors";

import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authService';
import { setUser } from '../features/user/userSlice';

import { signupSchema } from '../validations/singupSchema'
import InputForm from '../components/Input'
import SubmitButton from '../components/SubmitButton'


const Signup = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMail, setErrorMail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  
    const dispatch = useDispatch();

    const [triggerSignUp, result] = useSignUpMutation()

     useEffect(() => {
          if(result.isSuccess) {
          dispatch( setUser({
               email: result.data.email,
               token: result.data.idToken
          })
          )}
     }, [result])

    
  
     const onSubmit = () => {
          try {
              setErrorMail('')
              setErrorPassword('')
              setErrorConfirmPassword('')
              signupSchema.validateSync({
                email, password, confirmPassword
              })
              triggerSignUp({email, password, returnSecureToken: true})
              console.log(result)
          }catch (error) {
              //console.log(error);
              //console.log(error.path)
              //console.log(error.message)
              switch(error.path) {
                    case 'email':
                      setErrorMail(error.message)
                    break;
                    case 'password':
                      setErrorPassword(error.message)
                    break;
                    case 'confirmPassword':
                      setErrorConfirmPassword(error.message)
                    break;
              }
          }
     }

     return (
          <SafeAreaView style={styles.main} edges={['top']}>
               <View style={styles.container}>
                    <Text style={styles.title}>Signup</Text>
                    <InputForm label={"email"} onChange={setEmail} error={errorMail} />
                    <InputForm
                    label={"password"}
                    onChange={setPassword}
                    error={errorPassword}
                    isSecure={true}
                    />
                    <InputForm
                    label={"confirm password"}
                    onChange={setConfirmPassword}
                    error={errorConfirmPassword}
                    isSecure={true}
                    />
                    <SubmitButton onPress={onSubmit} title="Send" />
                    <Text style={styles.sub}>Already have an account?</Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                         <Text style={styles.subLink}>Login</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     );
}

export default Signup

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundGray,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "Josefin",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "black",
  },
  subLink: {
    fontSize: 14,
    fontFamily: "Josefin",
    color: "blue",
  },
});