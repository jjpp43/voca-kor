import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import LockSvg from "../util/lock-icon";

// Props for the ItemList component
type DrawerItemProps = {
  primaryText: string;
  secondaryText: string;
  locked?: boolean;
  onPress?: () => void;
};

const DrawerItem: React.FC<DrawerItemProps> = ({
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

export default DrawerItem;
