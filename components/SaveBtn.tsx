import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Theme from "../util/theme";

type SaveBtnProps = {
  id: string;
  onPress?: () => void;
};

const SaveBtn: React.FC<SaveBtnProps> = ({ id, onPress }) => {
  return <TouchableOpacity style={styles.saveBtn}></TouchableOpacity>;
};

const styles = StyleSheet.create({
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.NEUTRAL_300,

    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 4,
  },
  saveBtnText: {
    color: "#fff",
  },
});
