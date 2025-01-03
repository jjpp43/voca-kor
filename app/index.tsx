import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Theme from "../util/theme";
import FireSvg from "../util/fire-icon";
import MenuSvg from "../util/menu-icon";
import SpeakerSvg from "../util/speaker-icon";
import * as Speech from "expo-speech";
import Drawer from "../components/Drawer";
const vocabularyData = require("../assets/vocabulary.json"); // Import JSON data

const { height } = Dimensions.get("window"); // Get the height of the screen

type WordCardProps = {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  language: string;
  lexical: string;
  toggleLanguage: () => void;
};

const WordCard: React.FC<WordCardProps> = ({
  word,
  pronunciation,
  definition,
  example,
  language,
  lexical,
  toggleLanguage,
}) => {
  // Use TTS to speak the word
  const textToSpeechNormal = () => {
    Speech.speak(word, { language: "ko", rate: 1 });
  };
  const textToSpeechSlow = () => {
    Speech.speak(word, { language: "ko", rate: 0.1 });
  };

  return (
    <View style={[styles.card, { height }]}>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.pronunciation}>[ {pronunciation} ]</Text>
      {/* TTS Button */}
      <View style={styles.speaker}>
        {/* Normal Speed */}
        <TouchableOpacity onPress={textToSpeechNormal}>
          <View style={styles.speakerBtn}>
            <SpeakerSvg />
            <Text style={styles.speedText}>x1.0</Text>
          </View>
        </TouchableOpacity>
        {/* Slower Speed */}
        <TouchableOpacity onPress={textToSpeechSlow}>
          <View style={styles.speakerBtn}>
            <SpeakerSvg />
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
    </View>
  );
};

// Main App
export default function App() {
  const [language, setLanguage] = useState("en"); // Toggle between 'en' and 'kr'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer visibility
  const flatListRef = useRef<FlatList<any>>(null); // Create a ref for the FlatList

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
      {/* <SafeAreaView style={styles.safeAreaContainer}> */}
      {/* Drawer - Start */}
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Drawer - End */}
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" hidden={true} />
        <View style={styles.topIcons}>
          <TouchableOpacity onPress={toggleDrawer}>
            <MenuSvg />
          </TouchableOpacity>
          <FireSvg />
        </View>
        <FlatList
          ref={flatListRef}
          data={vocabularyData}
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
    color: "#484848",
  },
  selectedOptionText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  //Icons
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 5,
    position: "absolute",
    top: 56,
  },

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
