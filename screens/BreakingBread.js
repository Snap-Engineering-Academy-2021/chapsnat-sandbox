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
import { useFonts } from "expo-font" ;
import AppLoading from "expo-app-loading";

export default function SpotlightScreen() {
    let [fontsLoaded] = useFonts({
        'Graphik-Regular': require('../assets/fonts/Graphik-Bold.otf'),
      });
      if (!fontsLoaded) {
        return <AppLoading />;
      }
      else
      {
  return (
    <View style={styles.container}>
         <View style = {styles.newWeek}>
            <View style = {styles.yes}>
                <Text style = {{
                    color: '#FFFFFF',
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'fantasy',
                }} >NEW</Text>
                </View>
            <View style = {styles.eachweek}>
            <Text style = {{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 9.50,
                fontWeight: 'bold',
                fontFamily: 'fantasy',
            }} >EACH WEEK</Text>
            </View>
            <Text style = {{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 13.61,
                fontWeight: 'bold',
                fontFamily: 'fantasy',
                top: 7,
                left: 10,
            }} >EXPERIENCE/STICKERS !</Text>
             </View>
        <View style = {styles.getincontainer}>
            </View>
      
    </View>
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
   // paddingTop: StatusBar.currentHeight,
  },
  newWeek: {
      justifyContent: 'center',
    width: 284,
    height: 45,
    top: 150,
    backgroundColor: '#C6A580',
    borderRadius: 33,

  },
  getincontainer:
  {
    //position: "absolute",
   
    width: 307,
    height: 336,
    top: 180,
    borderRadius:33,
    backgroundColor: '#E2D1BF',
    //radius: 33,
  },
  yes: 
  {
    position: 'absolute',
    width: 71.48,
    height: 24.18,
    left: 7,
    backgroundColor: '#F4D664',
    borderRadius: 34.689,
  },
  eachweek: {
      position: 'absolute',
    width: 50.55,
    height: 13.08,
    left: 80,
    top: 8,
    
    backgroundColor:'#E08E47',
    borderRadius: 5.49657,
  },
});
