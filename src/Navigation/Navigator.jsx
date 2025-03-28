import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "../Navigation/BottomTabNavigator";

import AuthStack from "./AuthStackNavigator.jsx"
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from "../features/user/userSlice.js";

import { useDB } from "../hooks/useDB.js";

const Navigator = () => {
     //const [user, setUser] = useState(null)
     const {user} = useSelector(state => state.auth.value)
     return (
     
           <NavigationContainer>
               {user ? <BottomTabNavigator /> : <AuthStack />}
           </NavigationContainer>
     );
};

export default Navigator;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
     },
});