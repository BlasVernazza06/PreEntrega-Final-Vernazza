import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/HomeScreen";
import Detail from '../screens/ItemDetail';
import ItemListByCategory from '../screens/ItemListByCategory'

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={ItemListByCategory} name="ItemListByCategory"/>
        <Stack.Screen component={Detail} name="Detail" />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
