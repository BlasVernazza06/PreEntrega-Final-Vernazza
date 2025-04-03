import React from "react";
import { View, StyleSheet, SafeAreaView}  from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Forum from "./../screens/Forum"

const Stack = createNativeStackNavigator();

const ForumStackNavigator = () => {
  return (
      <Stack.Navigator
      initialRouteName="Forum"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Forum" component={Forum} />
    </Stack.Navigator>
  );
};

export default ForumStackNavigator;

const styles = StyleSheet.create({});