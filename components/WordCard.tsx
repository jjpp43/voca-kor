import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import * as Icons from "../util/export-icons";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "../util/theme";
import SaveBtn from "./SaveBtn";
const { height } = Dimensions.get("window"); // Get the height of the screen

type WordCardProps = {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  language: string;
  lexical: string;
  topic: string | null;
  toggleLanguage: (lang: string) => void;
};

const WordCard: React.FC<WordCardProps> = ({
  word,
  pronunciation,
  definition,
  example,
  language,
  lexical,
  topic,
  toggleLanguage,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const textToSpeechNormal = () => {
    Speech.speak(word, { language: "ko", rate: 1 });
  };
  const textToSpeechSlow = () => {
    Speech.speak(word, { language: "ko", rate: 0.1 });
  };

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedWords = await AsyncStorage.getItem("savedWords");
        const savedList = savedWords ? JSON.parse(savedWords) : [];
        setIsSaved(savedList.includes(word));
      } catch (error) {
        console.error("Error fetching saved words: ", error);
      }
    };
    checkSavedStatus();
  }, [word]);

  const handleToggleSave = async () => {
    try {
      const savedWords = await AsyncStorage.getItem("savedWords");
      const savedList = savedWords ? JSON.parse(savedWords) : [];

      if (isSaved) {
        const updatedList = savedList.filter(
          (savedWord: string) => savedWord !== word
        );
        await AsyncStorage.setItem("savedWords", JSON.stringify(updatedList));
        setModalMessage("Unsaved");
      } else {
        const updatedList = [...savedList, word];
        await AsyncStorage.setItem("savedWords", JSON.stringify(updatedList));
        setModalMessage("Saved");
      }

      setIsSaved(!isSaved);
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving word: ", error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  // ------- TEST ---------
  // Debugging storage : Print the list of saved word in the console for realtime updates on the storage
  const logSavedWords = async () => {
    try {
      const savedWords = await AsyncStorage.getItem("savedWords");
      const savedList = savedWords ? JSON.parse(savedWords) : [];
      console.log("Saved Words List:", savedList);
    } catch (error) {
      console.error("Error fetching saved words:", error);
    }
  };

  useEffect(() => {
    logSavedWords();
  }, []);

  return (
    <View style={[styles.card]}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.pronunciation}>[ {pronunciation} ]</Text>
      <View style={styles.speaker}>
        <TouchableOpacity onPress={textToSpeechNormal}>
          <View style={styles.speakerBtn}>
            <Icons.speakerIcon />
            <Text style={styles.speedText}>x1.0</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={textToSpeechSlow}>
          <View style={styles.speakerBtn}>
            <Icons.speakerIcon />
            <Text style={styles.speedText}>x0.5</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            language === "kr" && styles.selectedOption,
          ]}
          onPress={() => toggleLanguage("kr")}
        >
          <Text
            style={[
              styles.toggleOptionText,
              language === "kr" && styles.selectedOptionText,
            ]}
          >
            한글
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            language === "en" && styles.selectedOption,
          ]}
          onPress={() => toggleLanguage("en")}
        >
          <Text
            style={[
              styles.toggleOptionText,
              language === "en" && styles.selectedOptionText,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.definitionContainer}>
        <Text style={styles.lexical}>{lexical}</Text>
        <Text style={styles.definition}>{definition}</Text>
      </View>
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>{"ex) "}</Text>
        <Text style={styles.example}>{example}</Text>
      </View>
      <SaveBtn isSaved={isSaved} onToggleSave={handleToggleSave} />
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Theme.colors.BG_WHITE,
    height: height,
  },
  toggleButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007aff",
    borderRadius: 10,
    zIndex: 1,
  },
  toggleText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  flatList: {},

  word: {
    fontSize: 56,
    color: Theme.colors.TEXT_DARK,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 220,
  },
  pronunciation: {
    fontWeight: 300,
    fontSize: 18,
    color: "#555",
  },
  definitionContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 20,
    marginTop: 10,
    marginHorizontal: 24,
  },
  lexical: {
    fontSize: 20,
    color: Theme.colors.TEXT_DARK,
  },
  definition: {
    fontSize: 20,
    color: Theme.colors.TEXT_DARK,
  },
  exampleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  exampleTitle: {
    fontSize: 20,
    color: Theme.colors.TEXT_DARK,
    marginTop: 10,
  },
  example: {
    fontSize: 20,
    color: Theme.colors.TEXT_DARK,
    marginTop: 10,
  },

  //TTS
  speaker: {
    marginTop: 24,
    flexDirection: "row",
    gap: 40,
  },
  speakerBtn: {
    flexDirection: "column",
    alignItems: "center",
  },
  speedText: {
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 60,
  },

  //Toggle container
  toggleContainer: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    overflow: "hidden",
  },
  toggleOption: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.08)",
  },
  selectedOption: {
    backgroundColor: Theme.colors.NEUTRAL_300,
  },
  toggleOptionText: {
    fontSize: 14,
    color: Theme.colors.NEUTRAL_300,
  },
  selectedOptionText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: 180,
    width: "100%",
    left: "50%",
    height: "auto",
    transform: [{ translateX: "-50%" }],
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: 500,
  },
  //Icons
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 5,
    position: "absolute",
    top: 60,
  },
  topic: {},
});

export default WordCard;
