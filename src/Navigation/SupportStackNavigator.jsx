import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Support from "../screens/Support";

const Stack = createNativeStackNavigator();

const SupportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Support"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Support" component={Support} />
    </Stack.Navigator>
  );
};

export default SupportStack;