import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Account from '../screens/AccountScreen'
import ImageSelector from '../screens/ImageSelector'

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Account"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={Account} name="Account" />
        <Stack.Screen component={ImageSelector} name="ImageSelector" />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
