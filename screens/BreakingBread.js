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

export default function SpotlightScreen({navigation}) {
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
                    //fontFamily: 'fantasy',
                }} >NEW</Text>
                </View>
            <View style = {styles.eachweek}>
            <Text style = {{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 9.50,
                fontWeight: 'bold',
                //fontFamily: 'fantasy',
            }} >EACH WEEK</Text>
            </View>
            <Text style = {{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 13.61,
                fontWeight: 'bold',
               // fontFamily: 'fantasy',
                top: 7,
                left: 10,
            }} >EXPERIENCE/STICKERS !</Text>
        </View>
        <View style = {styles.getincontainer}>
            <View style = {styles.issues}>
              <Text style={{
                fontSize: 17,
                textAlign: 'center',
                lineHeight: 17,
                color: '#334451'
              }}>"Breaking Free" provides a community built 
                off of love, respect, and empowerment. Take your time to listen
                and share. Enjoy!
              </Text>
            </View>
         
            <TouchableOpacity style = {styles.gotit} onPress={() => {
         navigation.navigate("Main");
        }}>
            <Text style = {{
                color: '#FFFFFF',
                textAlign: 'center',
                fontSize: 16.61,
                fontWeight: 'bold',
               // fontFamily: 'fantasy',
            }} >Got it</Text>
            </TouchableOpacity>
            
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
    height: 40,
    top: 150,
    backgroundColor: '#C6A580',
    borderRadius: 33,
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
   getincontainer:
  {
    alignItems: 'center',
    width: 307,
    height: 336,
    top: 180,
    borderRadius:33,
    backgroundColor: '#E2D1BF',
    justifyContent: 'flex-end'
  },
  issues:
  {
    position: 'absolute',
    width: 252,
    height:128,
    top: 114,
    backgroundColor: '#FEFDF8',
    borderRadius: 33.689,
    justifyContent: 'center'
  },
  gotit:
  {
    position: 'relative',
    justifyContent: 'center',
    width: 172,
    height:38,
    bottom: 27,
    backgroundColor: '#334451',
    borderRadius: 22,
  },
});
