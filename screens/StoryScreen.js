import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

export default function StoryScreen({ navigation }) {
  return (
    <GestureRecognizer
      style={{ flex: 1 }}
      onSwipeDown={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          This is the story screen with gesture! Swipe down to go back.
        </Text>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    paddingTop: 200,
  },
  text: {
    fontSize: 50,
  },
});
