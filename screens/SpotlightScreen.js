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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const image = require("../assets/Spotlight.png")

export default function SpotlightScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    top: 0,
    overflow: "visible",
  },
  text: {
    fontSize: 50,
  },
});
