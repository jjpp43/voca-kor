// CustomDrawer.tsx
import React, { useState, useEffect } from "react";
import Theme from "../util/theme";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DrawerItem from "./DrawerItem";
import locksvg from "../util/lock-icon";

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
      {/* Outer part of the drawer */}
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
      {/* Drawer UI */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          backgroundColor: Theme.colors.BG_WHITE,
          zIndex: 2,
          width: 250,
          alignItems: "center",
          transform: [{ translateX: slideAnim }],
          opacity: opacityAnim, // Bind opacity to the animation
        }}
      >
        <ScrollView style={styles.list}>
          <Text style={styles.title}>Parts of speech</Text>
          <DrawerItem primaryText="N" secondaryText="oun" locked={false} />
          <DrawerItem primaryText="V" secondaryText="erb" locked={false} />
          <DrawerItem primaryText="Adj" secondaryText="ective" locked={false} />
          <View style={{ paddingVertical: 24 }}></View>
          <Text style={styles.title}>By topic</Text>
          <DrawerItem primaryText="B" secondaryText="usiness" />
          <DrawerItem primaryText="D" secondaryText="ad jokes" />
          <DrawerItem primaryText="E" secondaryText="motion" />
          <DrawerItem primaryText="F" secondaryText="ood" />
          <DrawerItem primaryText="T" secondaryText="ravel" />
          <DrawerItem primaryText="S" secondaryText="lang" />
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: Theme.colors.BG_WHITE,
    width: 250,
    marginTop: 100,
    paddingTop: 20,
    paddingHorizontal: 36,
  },
  textArea: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginVertical: 8,
  },
});

export default Drawer;
