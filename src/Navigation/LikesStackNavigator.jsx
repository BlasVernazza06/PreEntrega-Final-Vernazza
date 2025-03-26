import React from "react";
import { View, StyleSheet, SafeAreaView}  from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Likes from "./../screens/Likes"

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
      <Stack.Navigator
      initialRouteName="Likes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Likes" component={Likes} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});