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
import DrawerItemSaved from "./DrawerItemSaved";

type DrawerProps = {
  toggleDrawer: () => void;
  isOpen: boolean;
  onSelectTopic: (topic: string | null) => void; // Prop for topic selection
  onSelectLexical: (lexical: string | null) => void; // Prop for lexical selection
  onSelectSaved: () => void;
  scrollToTop: () => void; // Prop for scrolling to top
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  toggleDrawer,
  onSelectTopic,
  onSelectLexical,
  onSelectSaved,
  scrollToTop,
}) => {
  const [slideAnim] = useState(new Animated.Value(-250)); // Initial position off-screen (left)
  const [opacityAnim] = useState(new Animated.Value(0)); // Initial opacity (hidden)

  // For drawer apprearance animation
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
          <Text style={styles.title}>Hangul</Text>
          <DrawerItem
            primaryText="A"
            secondaryText="ll"
            locked={false}
            onPress={() => {
              onSelectTopic(null);
              onSelectLexical(null);
              //scrollToTop(); // Scroll to top after selection
            }}
          />
          {/* SAVED */}
          <DrawerItem
            primaryText="S"
            secondaryText="aved"
            locked={false}
            onPress={() => {
              onSelectSaved();
              //scrollToTop(); // Scroll to top after selection
            }}
          />
          <View style={{ paddingVertical: 24 }}></View>
          <Text style={styles.title}>Parts of speech</Text>
          {/* NOUN */}
          <DrawerItem
            primaryText="N"
            secondaryText="oun"
            locked={false}
            onPress={() => {
              onSelectLexical("(n.)");
              //scrollToTop();
            }}
          />
          {/* VERB */}
          <DrawerItem
            primaryText="V"
            secondaryText="erb"
            locked={false}
            onPress={() => {
              onSelectLexical("(v.)");
              //scrollToTop();
            }}
          />
          {/* ADJ */}
          <DrawerItem
            primaryText="Adj"
            secondaryText="ective"
            locked={false}
            onPress={() => {
              onSelectLexical("(adj.)");
              //scrollToTop();
            }}
          />
          <View style={{ paddingVertical: 24 }}></View>
          <Text style={styles.title}>By topic</Text>
          <DrawerItem primaryText="B" secondaryText="usiness" />
          <DrawerItem primaryText="D" secondaryText="ad jokes" />

          <DrawerItem
            primaryText="E"
            secondaryText="motion"
            locked={false}
            onPress={() => {
              onSelectTopic("emotion");
              //scrollToTop();
            }}
          />
          <DrawerItem
            primaryText="F"
            secondaryText="ood"
            locked={false}
            onPress={() => {
              onSelectTopic("food");
              //scrollToTop();
            }}
          />
          <DrawerItem primaryText="I" secondaryText="diom" />
          <DrawerItem primaryText="N" secondaryText="ative words" />
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
    marginTop: 110,
    paddingTop: 40,
    paddingHorizontal: 36,
  },
  textArea: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginVertical: 4,
  },
});

export default Drawer;
