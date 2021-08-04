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
import Ncomponent from "../components/Ncomponent"
export default function SpotlightScreen({navigation}) {
  return (
    <View style={styles.container}>
     <View>
     <TouchableOpacity style = {styles.gotit} onPress= {
        () => 
        { navigation.navigate("Pic");}
    }>
           <Text> DOPE!!</Text>
    </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  gotit:
  {
    justifyContent: 'center',

    position: 'relative',
    width: 50,
    height:38,
    top: 1,
    backgroundColor: 'blue',
    borderRadius: 22,
  },
});