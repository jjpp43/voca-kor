import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const vocabularyData = require("../assets/vocabulary.json"); // Import JSON data

const { height } = Dimensions.get("window");

type WordCardProps = {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
};

export const WordCard: React.FC<WordCardProps> = ({
  word,
  pronunciation,
  definition,
  example,
}) => {
  return (
    <View>
      <Text>{word}</Text>
      <Text>[{pronunciation}]</Text>
      <View>
        <Text>{definition}</Text>
      </View>
      <Text>{example}</Text>
    </View>
  );
};
