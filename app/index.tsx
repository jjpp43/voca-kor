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
import WordCard from "../components/wordCard";

const vocabularyData = require("../assets/vocabulary.json"); // Import JSON data

const { height } = Dimensions.get("window"); // Get the height of the screen

// Main App
export default function App() {
  const [language, setLanguage] = useState("en"); // Toggle between 'en' and 'kr'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer visibility
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // Topic filter state
  const [selectedLexical, setSelectedLexical] = useState<string | null>(null); // Lexical filter state
  const [savedWords, setSavedWords] = useState<string[]>([]); // Saved word filter state
  const [showSavedOnly, setShowSavedOnly] = useState(false); // Toggle to show only saved words
  const flatListRef = useRef<FlatList<any>>(null); // Create a ref for the FlatList

  // Load saved words from AsyncStorage
  useEffect(() => {
    loadSavedWords();
  }, []);

  const loadSavedWords = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedWords");
      if (saved) {
        setSavedWords(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load saved words:", error);
    }
  };

  // Add this function to handle updates to saved words
  const handleSavedWordsUpdate = async (word: string, isSaving: boolean) => {
    try {
      const newSavedWords = isSaving
        ? [...savedWords, word]
        : savedWords.filter((w) => w !== word);
      setSavedWords(newSavedWords);
      await AsyncStorage.setItem("savedWords", JSON.stringify(newSavedWords));
    } catch (error) {
      console.error("Error updating saved words:", error);
    }
  };

  // Filter Data by Topic and Lexical and Saved
  const filteredData = vocabularyData.filter((item: any) => {
    const matchesTopic = selectedTopic ? item.topic === selectedTopic : true;
    const matchesLexical = selectedLexical
      ? item.lexical === selectedLexical
      : true;
    const matchesSaved = showSavedOnly ? savedWords.includes(item.word) : true;
    return matchesTopic && matchesLexical && matchesSaved;
  });

  // Select lexical and close drawer after selection
  const handleLexicalSelection = (lexical: string | null) => {
    setSelectedTopic(null);
    setSelectedLexical(lexical);
    setShowSavedOnly(false);
    setIsDrawerOpen(false);
  };

  // Select topic and close drawer after selection
  const handleTopicSelection = (topic: string | null) => {
    setSelectedLexical(null);
    setSelectedTopic(topic);
    setShowSavedOnly(false);
    setIsDrawerOpen(false);
  };

  // Select only saved words and close drawer after selection
  const handleSavedSelection = () => {
    setSelectedTopic(null);
    setSelectedLexical(null);
    setShowSavedOnly(true);
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
      onSavedUpdate={handleSavedWordsUpdate}
      isSaved={savedWords.includes(item.word)}
    />
  );

  // Render if there's no content to display
  const renderEmptyState = () => {
    if (showSavedOnly && savedWords.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Discover & Save{"\n"}new words!</Text>
        </View>
      );
    }
    return null;
  };

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
        onSelectSaved={handleSavedSelection}
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

        {filteredData.length > 0 ? (
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
        ) : (
          renderEmptyState()
        )}

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
  flatList: {},
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
  //For empty content
  emptyContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: Theme.colors.TEXT_DARK,
    textAlign: "center",
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
