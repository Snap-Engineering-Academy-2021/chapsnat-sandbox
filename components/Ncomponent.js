import React, { useState, useCallback, useEffect } from "react";
import { Text, Image, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";


export default function Ncomponent({navigation}) {

  return (
    <TouchableOpacity style = {styles.gotit} onPress= {
        () => 
        { navigation.navigate("Pic");}
    }>
           <Text> DOPE!!</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    gotit:
  {
    justifyContent: 'center',

    position: 'relative',
    width: 172,
    height:38,
    top: 1,
    backgroundColor: '#334451',
    borderRadius: 22,
  },
});