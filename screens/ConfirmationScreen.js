import React, { useState, useEffect } from "react";
import Colors from "../constants/Colors";
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import head from "../assets/ThankYou.png";
const deviceWidth = Dimensions.get('window').width;

export default function Confirmation({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={head} style= {{ 
           width: deviceWidth ,
    height: deviceWidth*1.70}}/>
    <TouchableOpacity style= {styles.gotit} onPress={ ()=> 
    {
        navigation.navigate("Main");
    }}>
             <Text style= {
               {
                 textAlign: 'center',
                 color: 'white',
                 fontSize: 17,
                
               }
             }>Return</Text>
            </TouchableOpacity>
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
  gotit:
  {
    position: 'relative',
    justifyContent: 'center',
    width: 102,
    height:38,
    top: 40,
   alignSelf: 'center',
       backgroundColor: '#000000',
    borderRadius: 45,
  }
});
