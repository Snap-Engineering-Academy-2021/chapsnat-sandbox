import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import head from "../assets/FormHeader.png";
const deviceWidth = Dimensions.get('window').width;

export default function SpotlightScreen() {
  return (
    <View style={styles.container}>
      <Image source={head} style= {{ width: deviceWidth ,
    height: deviceWidth/1.32}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 50,
  },
});
