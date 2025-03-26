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
        colors={["rgba(245, 211, 166, 0.6)", "rgba(243, 216, 186, 0.4)", "rgba(248, 216, 157, 0)"]}
        start={{ x: 0.5, y: -0.2 }}
        end={{ x: 0.5, y: 2 }}
        style={styles.background}
      />
      <View style={styles.loadMessage}>
        <Animated.Text
          style={{
            color: colors.orangeLogo || 'orange', // Verifica que sea un string
            fontSize: 34,
            fontWeight: "bold",
            transform: [{ rotateY: rotateInterpolate }],
            opacity: fadeAnim, // Debe ser un Animated.Value
          }}
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
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -2,
  },
  loadMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    gap: 10,
  },
});
