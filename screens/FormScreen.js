import React, { Component, useState } from 'react';
import { Image, StyleSheet, Text, View,TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from "@firebase/app";
import Colors from "../constants/Colors";
import db from "../firebase";
import head from "../assets/FormHeader.png";
export default function FormScreen({navigation})  {
  const dimensions = Dimensions.get('window');
  const imageWidth = dimensions.width;
    const [email, setEmail] = useState("");
    const [DoB, setDoB] = useState("");
    const [name, setName] = useState("");
    const [story, setStory] = useState("");
    //refrences for the specific reference in firebase
    const [loader, setLoader] = useState(false);
    var data = firebase.database();

    const formSubmit =  (e)=>
    {
     e.preventDefault();
     setLoader(true);
      db.collection("stories")
      .add({
        name: name,
        email: email,
        dateOfbirth: DoB,
        story: story,
      })
      .then(() => {
        setLoader(false);
        navigation.navigate("Confirm");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setEmail("");
    setDoB("");
    setStory("");
    }
    return (

      <View style={styles.container}>
        <View style = {{flex: 1.1}}>
        <Image  
        style= {{
          
          width: imageWidth,
          height: imageWidth/1.39
          
        }} source={head}/>
        </View>
           <View style={styles.textholder}>
           <View style={styles.usersinfo}>
           <Text style= {
             {fontSize: 14,
              lineHeight: 14,
              position: 'absolute',
              marginBottom:35,
              left: 65
             }
           }>Name:</Text>
            <Text style= {
             {fontSize: 14,
              lineHeight: 14,
              position: 'absolute',
              marginBottom:35,
              left: 230
             }
           }>Date of Birth:</Text>
           <TextInput style = {styles.name}
               onChangeText={setName} 

           /> 
           <TextInput style = {styles.date}
              marginLeft={20}
               keyboardType='number-pad'
               onChangeText={setDoB} 

           />
           <TextInput style = {styles.date}
               keyboardType='number-pad'
               onChangeText={setDoB} 

           />
           <TextInput style = {styles.date}
               keyboardType='number-pad'
               onChangeText={setDoB} 

           />
           </View>
           <View style={styles.setemial}>
           <Text  style= {
             {fontSize: 14,
              lineHeight: 14,
              position: 'relative',
              left: 65
             }}>Email:</Text>
            <TextInput style = {styles.email}
              // style={styles.inputs}
               keyboardType="email-address"
               onChangeText={setEmail} 
               />
            </View>
            <View style ={styles.setstory}>
            <Text  style= {
             {fontSize: 14,
              lineHeight: 14,
              position: 'relative',
              left: 65
             }}>Share your story:</Text>
           <TextInput style = {styles.story} 
               keyboardType='default'
               onChangeText={setStory} 
               multiline={true}
               spellCheck= {true}
           />
           </View>
           <TouchableOpacity style= {styles.gotit} onPress={formSubmit}>
             <Text style= {
               {
                 textAlign: 'center',
                 color: 'white',
                 fontSize: 17,
               }
             }>Submit</Text>
            </TouchableOpacity>
           </View>
          
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  textholder:
  {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: 'white',

  },
  usersinfo:
  {
    paddingTop: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent:'center',
    
  },
  setemial:
  {
    flexDirection: "column",
    
  },
  setstory:
  {
    flexDirection: "column",

  },
  name: {
    //position: 'absolute',
    marginTop: 8,
    alignSelf: 'stretch',
    width: 145, 
    height: 34, 
    backgroundColor: '#EDEDED',
    borderRadius: 7
  },
  email: {
    position: 'relative',
    width: 198, 
    height: 34, 
    marginTop: 8,
    backgroundColor: '#EDEDED',
    borderRadius: 7,
    left: 65

  },
  date: {
    position: 'relative',
    marginLeft: 10,
    marginTop: 8,
    width: 33, 
    height: 34, 
    borderBottomColor: "red",
    backgroundColor: '#EDEDED',
    borderRadius: 7
  },
  story: {
    textAlignVertical: 'top',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 8,
    width: 290, 
    height: 200, 
    backgroundColor: '#EDEDED',
    borderRadius: 7
  },
  gotit:
  {
    position: 'relative',
    justifyContent: 'center',
    width: 102,
    height:38,
   bottom: 40,
   alignSelf: 'center',

    backgroundColor: '#000000',
    borderRadius: 45,
  }
});