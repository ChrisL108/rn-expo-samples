import * as React from "react";
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  StyleSheetProperties,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const DEFAULT_COLORS = ["#f2f2f2", "gray"];

export default function SkeletonView({
  loading,
  contentStyles,
  wrapperStyles,
  children,
  colorArray,
}: {
  loading: boolean;
  contentStyles?: StyleProp<ViewStyle>;
  wrapperStyles?: StyleProp<ViewStyle>;
  children?: JSX.Element | JSX.Element[];
  colorArray?: string[];
}) {
  const wrapperBorder = useSharedValue(0);
  const innerOpacity = useSharedValue(0);

  const borderStyles = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      wrapperBorder.value,
      [0, 1],
      colorArray || DEFAULT_COLORS
    ),
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: innerOpacity.value,
  }));
  React.useEffect(() => {
    if (loading) {
      wrapperBorder.value = withRepeat(
        withTiming(1, { duration: 800 }),
        -1,
        true
      );
    } else {
      wrapperBorder.value = 0;
      innerOpacity.value = withSpring(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Animated.View style={[borderStyles, localStyles.wrapper, wrapperStyles]}>
      <Animated.View
        style={[opacityStyles, localStyles.content, contentStyles]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const localStyles = StyleSheet.create({
  wrapper: { borderWidth: 2 },
  content: { flex: 1 },
});
