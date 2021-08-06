import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  Imag,
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
      <Image source = {Miles}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 50,
  },
});
