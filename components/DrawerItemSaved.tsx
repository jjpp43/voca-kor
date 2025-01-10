import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import LockSvg from "../util/lock-icon";
import Theme from "@/util/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Props for the ItemList component
type DrawerItemSavedProps = {
  primaryText: string;
  secondaryText: string;
  locked?: boolean;
  onPress?: () => void;
};

// State to store items loaded from AsyncStorage
const [savedItems, setSavedItems] = useState<DrawerItemSavedProps[]>([]);

// Function to load items from AsyncStorage
const loadItems = async () => {
  try {
    const storedData = await AsyncStorage.getItem("drawerItems"); // Replace 'drawerItems' with your storage key
    if (storedData) {
      const parsedData: DrawerItemSavedProps[] = JSON.parse(storedData);
      setSavedItems(parsedData); // Parse stored JSON string and update state
    }
  } catch (error) {
    console.error("Error loading items:", error);
  }
};

useEffect(() => {
  loadItems();
}, []);

const DrawerItemSaved: React.FC<DrawerItemSavedProps> = ({
  primaryText,
  secondaryText,
  locked = true,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.textArea}>
        <Text style={styles.primaryText}>{primaryText}</Text>
        <Text style={styles.secondaryText}>{secondaryText}</Text>
      </View>
      {locked && <LockSvg />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: "auto",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
  },
  textArea: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  primaryText: {
    fontSize: 28,
    fontWeight: "500",
  },
  secondaryText: {
    fontSize: 20,
  },
});

export default DrawerItemSaved;
