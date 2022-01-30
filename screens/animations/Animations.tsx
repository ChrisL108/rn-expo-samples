import * as React from "react";

import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { View } from "../../components/Themed";
import styles from "./styles";

export default function Animations({}) {
  // const tap = Gesture.Tap().onStart(() => console.log("Tap"));
  const pan = Gesture.Pan().onStart(() => console.log("Pan"));
  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <View style={styles.circle} />
      </View>
    </GestureDetector>
  );
}
