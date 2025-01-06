import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../util/theme";
import SaveIcon from "@/util/save-icon";
import SavedIcon from "@/util/saved-icon";

type SaveBtnProps = {
  isSaved: boolean;
  onToggleSave?: () => void;
};

const SaveBtn: React.FC<SaveBtnProps> = ({ isSaved, onToggleSave }) => {
  return (
    <TouchableOpacity onPress={onToggleSave} style={styles.border}>
      {isSaved ? <SavedIcon /> : <SaveIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  border: {
    marginTop: 40,
  },
});

export default SaveBtn;
