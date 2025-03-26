import { StyleSheet, View, Animated, Text } from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useState } from 'react';

export default function Loader() {
     const [favState, setFavState] = useState(false)

     return (
     <View style={styles.container}>
          {favState ? 
               <AntDesign name="heart" size={24} style={styles.heartState} />
               :
               <FontAwesome5 name="heart-broken" size={24} style={styles.BrokenheartState} />
          }
     </View>
     );
}

const styles = StyleSheet.create({
  container: {
  },
});
