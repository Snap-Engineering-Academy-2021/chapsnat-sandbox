import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  ImageBackground,
  StyleSheet,
  Button,
  Text,
  View,
  StatusBar,
} from "react-native";

export default function SpotlightScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Press me to launch a story"
        onPress={() => navigation.navigate("Story")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  text: {
    fontSize: 50,
  },
});
