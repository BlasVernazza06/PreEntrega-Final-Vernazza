import { StyleSheet, View, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../global/colors";

export default function Loader() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(245, 211, 166, 0.6)",  // Naranja claro con transparencia
          "rgba(243, 216, 186, 0.4)",  // Naranja medio con transparencia
          "rgba(248, 216, 157, 0)"   // Naranja más oscuro con transparencia
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.loadMessage}>
        <Animated.Text
          style={[
            styles.loadingText,
            {
              transform: [{ rotateY: rotateInterpolate }],
              opacity: fadeAnim,
            }
          ]}
        >
          AeroViajes
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  loadMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    color: colors.orangeLogo,
    fontSize: 34,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});
