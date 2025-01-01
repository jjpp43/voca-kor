// CustomDrawer.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

type DrawerProps = {
  toggleDrawer: () => void;
  isOpen: boolean;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  const [slideAnim] = useState(new Animated.Value(-250)); // Initial position off-screen (left)
  const [opacityAnim] = useState(new Animated.Value(0)); // Initial opacity (hidden)

  useEffect(() => {
    if (isOpen) {
      // Animate the drawer to slide in and fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0, // Move the drawer to its final position (0 means fully visible)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade in the drawer
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate the drawer to slide out and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -250, // Move the drawer off-screen to the left
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0, // Fade out the drawer
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen, slideAnim, opacityAnim]);

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
              zIndex: 1, // Overlay on top of everything
            }}
          />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: "#fff",
          zIndex: 2,
          width: 240,
          alignItems: "center",
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim, // Bind opacity to the animation
        }}
      >
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Drawer Content</Text>
        <TouchableOpacity onPress={toggleDrawer}>
          <Text style={{ fontSize: 18 }}>Close Drawer</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default Drawer;
