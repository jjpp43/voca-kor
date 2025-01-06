import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Modal,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Theme from "../util/theme";
import * as Icons from "../util/export-icons";
import * as Speech from "expo-speech";
import SaveBtn from "../components/SaveBtn";
import Drawer from "../components/Drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const vocabularyData = require("../assets/vocabulary.json"); // Import JSON data

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
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Track the modal message

  // Use TTS to speak the word
  const textToSpeechNormal = () => {
    Speech.speak(word, { language: "ko", rate: 1 });
  };
  const textToSpeechSlow = () => {
    Speech.speak(word, { language: "ko", rate: 0.1 });
  };

  //
  const handleToggleSave = () => {
    if (isSaved) {
      setModalMessage("Unsaved");
    } else {
      setModalMessage("Saved");
    }
    setModalVisible(true); // Show the modal
    setIsSaved(!isSaved);
  };

  // Automatically hide the modal after 3 seconds
  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false); // Hide the modal after 3 seconds
      }, 1000);

      return () => clearTimeout(timeout); // Cleanup the timeout
    }
  }, [modalVisible]);

  return (
    <View style={[styles.card, { height }]}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.pronunciation}>[ {pronunciation} ]</Text>
      {/* TTS Button */}
      <View style={styles.speaker}>
        {/* Normal Speed */}
        <TouchableOpacity onPress={textToSpeechNormal}>
          <View style={styles.speakerBtn}>
            <Icons.speakerIcon />
            <Text style={styles.speedText}>x1.0</Text>
          </View>
        </TouchableOpacity>
        {/* Slower Speed */}
        <TouchableOpacity onPress={textToSpeechSlow}>
          <View style={styles.speakerBtn}>
            <Icons.speakerIcon />
            <Text style={styles.speedText}>x0.5</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* End of TTS */}
      {/* Toggle Button */}
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
      {/* Save Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>{isSaved ? "Saved!" : "Unsaved"}</Text>
        </View>
      </Modal>
    </View>
  );
};

// Main App
export default function App() {
  const [language, setLanguage] = useState("en"); // Toggle between 'en' and 'kr'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer visibility
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // Topic filter state
  const [selectedLexical, setSelectedLexical] = useState<string | null>(null); // Lexical filter state
  const flatListRef = useRef<FlatList<any>>(null); // Create a ref for the FlatList

  // Filter Data by Topic and Lexical
  const filteredData = vocabularyData.filter((item: any) => {
    const matchesTopic = selectedTopic ? item.topic === selectedTopic : true;
    const matchesLexical = selectedLexical
      ? item.lexical === selectedLexical
      : true;
    return matchesTopic && matchesLexical;
  });

  // Select lexical and close drawer after selection
  const handleLexicalSelection = (lexical: string | null) => {
    setSelectedTopic(null);
    setSelectedLexical(lexical);
    setIsDrawerOpen(false);
  };

  // Select topic and close drawer after selection
  const handleTopicSelection = (topic: string | null) => {
    setSelectedLexical(null);
    setSelectedTopic(topic);
    setIsDrawerOpen(false);
  };

  const toggleLanguage = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <WordCard
      word={item.word}
      pronunciation={item.pronunciation}
      definition={language === "en" ? item.definition_en : item.definition_kr}
      example={language === "en" ? item.example_en : item.example_kr}
      language={language}
      lexical={item.lexical}
      toggleLanguage={toggleLanguage}
      topic={null}
    />
  );

  // Scroll back to the top of the list
  const scrollToTop = () => {
    if (flatListRef.current) {
      // Use scrollToIndex instead of scrollToOffset
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  // Toggle the drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Toast />
      {/* <SafeAreaView style={styles.safeAreaContainer}> */}
      {/* Drawer - Start */}
      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        onSelectTopic={handleTopicSelection}
        onSelectLexical={handleLexicalSelection}
        scrollToTop={scrollToTop}
      />
      {/* Drawer - End */}

      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" hidden={true} />
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icons.menuIcon />
          </TouchableOpacity>
          <Icons.fireIcon />
        </View>

        <FlatList
          ref={flatListRef}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToAlignment="start"
          snapToInterval={height}
          decelerationRate="fast"
          style={styles.flatList}
        />

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={scrollToTop} // Scroll to top when pressed
        >
          <Text style={styles.fabText}>↑</Text>
        </TouchableOpacity>
      </View>
      {/* </SafeAreaView> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.BG_WHITE,
  },
  mainContainer: {
    marginHorizontal: 24,
  },
  //Incase we need a safeAreaContainer
  safeAreaContainer: {
    flex: 1, // Ensure that SafeAreaView takes up the full screen
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
  card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Theme.colors.BG_WHITE,
  },
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
    top: 210,
    width: "100%",
    left: "50%",
    height: "auto",
    transform: [{ translateX: "-50%" }],
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 15,
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
  //FLoating action button
  fab: {
    position: "absolute",
    bottom: 64,
    right: 0,
    backgroundColor: "#484744",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10, // Add shadow for Android
  },
  fabText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
