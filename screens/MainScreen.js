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

export default function SpotlightScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This is the spotlight screen! 
      </Text>
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