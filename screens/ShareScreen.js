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
import Miles from "../assets/MilesShare.png"
export default function SpotlightScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source = {Miles}  style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
  },
  image:
  {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    fontSize: 50,
  },
});
