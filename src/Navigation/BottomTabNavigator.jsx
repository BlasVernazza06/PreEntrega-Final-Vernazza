"use client"

import { StyleSheet, View, Dimensions, Text, Image } from "react-native"
import { useEffect, useRef } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons"
import Feather from "@expo/vector-icons/Feather"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../global/colors"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated"

import HomeStackNavigator from "./HomeStackNavigator"
import CartStackNavigator from "./CartStackNavigator"
import ForumStackNavigator from "./ForumStackNavigator"
import AccountStackNavigator from "./AccountStackNavigator"
import SupportStackNavigator from "./SupportStackNavigator"

const Tab = createBottomTabNavigator()
const { width } = Dimensions.get("window")

const BottomTab = () => {
  // Se obtiene el ancho de la pantalla.
  const tabWidth = width / 5 // 5 tabs
  // Se crea un estado para el valor de la animación.
  const animationValues = useRef(
    Array(5)
      .fill(null)
      .map(() => useSharedValue(1)),
  ).current
  // Se crea un estado para el valor de la animación.
  const translateYValues = useRef(
    Array(5)
      .fill(null)
      .map(() => useSharedValue(0)),
  ).current
  // Se crea un estado para el valor de la animación.
  const opacityValues = useRef(
    Array(5)
      .fill(null)
      .map(() => useSharedValue(1)),
  ).current

    // Componente de la barra de navegación.
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    // Se actualiza el valor de la animación cuando cambia el tab.
    useEffect(() => {
      state.routes.forEach((_, index) => {
        const isActive = state.index === index
        const distanceFromActive = Math.abs(index - state.index)

        animationValues[index].value = isActive
          ? withSpring(1.2, { damping: 15 })
          : withTiming(1, { duration: 200 })

        translateYValues[index].value = isActive
          ? withSpring(-15, { damping: 15 })
          : withTiming(0, { duration: 200 })

        opacityValues[index].value = interpolate(distanceFromActive, [0, 1, 2], [1, 0.7, 0.5])
      })
    }, [state.index])

    return (
      <View style={styles.tabBarContainer}>
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const isFocused = state.index === index

            // Se crea un estilo animado para cada icono de tab.
            const iconAnimatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: animationValues[index].value }],
              opacity: opacityValues[index].value,
            }))

            // Se obtiene la función para navegar a la pantalla.
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              })

              // Se navega a la pantalla.
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name)
              }
            }

            return (
              <View key={index} style={styles.tabItem}>
                <Animated.View style={[styles.tabButton, iconAnimatedStyle]} onTouchEnd={onPress}>
                  {options.tabBarIcon({ focused: isFocused })}
                </Animated.View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={() => ({
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Ecomerce"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTab}>
              <FontAwesome5 name="store" size={24} color={focused ? colors.orangeLogo : "black"} />
              <Text style={[styles.tabText,{ color: focused ? colors.orangeLogo : "black" }]}  numberOfLines={1} >Buscar</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Foro de Viajes"
        component={ForumStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTab}>
              <Image 
                source={require('../../assets/Images/foro.png')} 
                style={[styles.iconTab, { tintColor: focused ? colors.orangeLogo : "black" }]} 
              />
              <Text style={[styles.tabText, { color: focused ? colors.orangeLogo : "black", textAlign: 'center' }]} 
              numberOfLines={2}>Foro de Viajes</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Mis Viajes"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTab}>
              <MaterialIcons name="luggage" size={24} color={focused ? colors.orangeLogo : "black"} />
              <Text style={[styles.tabText,{ color: focused ? colors.orangeLogo : "black" }]}  numberOfLines={1} >Mis Viajes</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Soporte"
        component={SupportStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTab}>
              <FontAwesome5 name="headset" size={24} color={focused ? colors.orangeLogo : "black"} />
              <Text style={[styles.tabText,{ color: focused ? colors.orangeLogo : "black" }]}  numberOfLines={1}>Soporte</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconTab}>
              <Ionicons name="person" size={24} color={focused ? colors.orangeLogo : "black"} />
              <Text style={[styles.tabText,{ color: focused ? colors.orangeLogo : "black" }]} numberOfLines={1}>Perfil</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBar: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 70,
    borderRadius: 25,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    zIndex: 10,
  },
  iconTab: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 9,
    fontWeight: 'bold',
  }
})

export default BottomTab
