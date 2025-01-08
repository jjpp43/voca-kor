import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";

const StreakCounter = () => {
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    const checkStreak = async () => {
      try {
        const storedLastLoginDate = await AsyncStorage.getItem("lastLoginDate");
        const today = new Date(); // Keep this as a Date object
        const todayString = today.toDateString(); // String for comparison

        if (storedLastLoginDate) {
          const lastLogin = new Date(storedLastLoginDate); // Convert to Date object
          const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

          const diffInTime = today.getTime() - lastLogin.getTime(); // Milliseconds difference
          const diffInDays = Math.floor(diffInTime / oneDay); // Convert to days

          if (diffInDays === 0) {
            // User logged in today, do nothing
            return;
          } else if (diffInDays === 1) {
            // User logged in yesterday, increment streak
            const currentStreak = parseInt(
              (await AsyncStorage.getItem("streakCount")) || "0",
              10
            );
            const newStreak = currentStreak + 1;
            setStreakCount(newStreak);
            await AsyncStorage.setItem("streakCount", newStreak.toString());
          } else {
            // User logged in after a gap, reset streak
            setStreakCount(1);
            await AsyncStorage.setItem("streakCount", "1");
          }
        } else {
          // First time login, start streak
          setStreakCount(1);
          await AsyncStorage.setItem("streakCount", "1");
        }

        await AsyncStorage.setItem("lastLoginDate", todayString);
      } catch (error) {
        console.error("Error checking streak:", error);
      }
    };

    checkStreak();
  }, []);

  return (
    <View>
      <Text>🔥 Current Streak: {streakCount} days</Text>
    </View>
  );
};

export default StreakCounter;
