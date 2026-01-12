import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

interface ToggleProps {
  onToggle: (on: boolean) => void,
  initialValue: boolean
}

export default function Toggle({ onToggle, initialValue = false }: ToggleProps) {
  const [pressed, setPressed] = useState(initialValue);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const circleXPosition = useRef(new Animated.Value(3)).current;
  const switchColorValue = useRef(new Animated.Value(0)).current;
  const switchColor = switchColorValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#4b5563", "#544FFF"]
  })

  return (
    <AnimatedPressable
      style={[
        styles.border,
        {
          borderColor: switchColor,
        },
      ]}
      onPress={() => {
        if (!pressed) {
          Animated.parallel([
            Animated.timing(circleXPosition, {
              toValue: 13,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(switchColorValue, {
              toValue: 1,
              duration: 100,
              useNativeDriver: false,
            }),
          ]).start();
        } else {
          Animated.parallel([
            Animated.timing(circleXPosition, {
              toValue: 3,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(switchColorValue, {
              toValue: 0,
              duration: 100,
              useNativeDriver: false,
            }),
          ]).start();
        }

        setPressed(!pressed);
        onToggle(pressed)
      }}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            left: circleXPosition,
            borderColor: switchColor,
          },
        ]}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  border: {
    position: 'relative',
    width: 28,
    height: 17,
    borderWidth: 2,
    borderRadius: 8.5,
  },
  circle: {
    position: 'absolute',
    top: 2.5,
    width: 8,
    height: 8,
    borderWidth: 2,
    borderRadius: 4,
  },
});
