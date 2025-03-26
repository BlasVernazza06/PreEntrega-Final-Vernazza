import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={Register} name="Register" />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStackNavigator;

const styles = StyleSheet.create({});
