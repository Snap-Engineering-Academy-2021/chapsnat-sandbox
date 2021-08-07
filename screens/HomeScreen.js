import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import db from "../firebase";
import firebase from "@firebase/app";
import { ListItem, Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import { Ionicons, Feather } from "@expo/vector-icons";

const MILLIS_IN_SEC = 1000;
const MILLIS_IN_MIN = MILLIS_IN_SEC * 60;
const MILLIS_IN_HOUR = MILLIS_IN_MIN * 60;
const MILLIS_IN_DAY = MILLIS_IN_HOUR * 24;
const MILLIS_IN_WEEK = MILLIS_IN_DAY * 7;

export default function HomeScreen({ navigation }) {
  const [chatList, setChatList] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [currMillis, setCurrMillis] = useState(Date.now());

  useEffect(() => {
    // Download curr user info
    // (and listen for future updates)
    // (in case curr user decides to update their profile info)

    let unsubscribeFromNewSnapshots = db
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((userSnapshot) => {
        setCurrUser({ uid: userSnapshot.id, ...userSnapshot.data() });
      });

    // Refresh time labels every minute
    let intervalID = setInterval(
      () => setCurrMillis(Date.now()),
      MILLIS_IN_MIN
    );
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (!currUser) return;
    // Download chats for user
    let chatsRef = db.collection("Chats");
    let query = chatsRef.where("users", "array-contains", currUser.uid);
    // Venus fix
    let unsubscribeFromNewSnapshots = query.onSnapshot((querySnapshot) => {
      let newChatList = [];
      querySnapshot.forEach((doc) => {
        let newChat = { ...doc.data() };
        newChat.id = doc.id;
        newChatList.push(newChat);
      });
      newChatList.sort((a, b) => a.lastUpdated <= b.lastUpdated);
      setChatList(newChatList);
    });

    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, [currUser]);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => (
          <ChatItem
            onPress={() =>
              navigation.navigate("Chat", {
                chatName: item.id,
                currUser: currUser,
              })
            }
            item={item}
            currMillis={currMillis}
          />
        )}
      />
      <View style={styles.addButton}>
        <TouchableOpacity
          style={styles.Circle}
          onPress={() => navigation.navigate("Friends")}
        >
          <Ionicons
            name={"add-circle"}
            size={60}
            style={{ marginBottom: 8 }}
            color={Colors.snapblue}
          />
        </TouchableOpacity>
      
      </View>
    </View>
  );
}

function ChatItem({ onPress, item, currMillis }) {
  return (
    <ListItem
      Component={TouchableOpacity}
      containerStyle={styles.chatItemContainer}
      disabledStyle={{ opacity: 0.5 }}
      onPress={onPress}
      pad={20}
    >
      <Avatar source={require("../assets/chat_placeholder.jpg")} />
      <ListItem.Content>
        <ListItem.Title>
          <Text>{item.id}</Text>
        </ListItem.Title>
        <Feather style ={styles.iconing}
        name="message-square" 
            color='#7D7D7D'
            size={30}/>
            <View style = {styles.line}/>
        <ListItem.Subtitle style={styles.subtitle}>
          <Image
            style={styles.chatIcon}
            source={require("../assets/bluechat.png")}
          />
          <Text style={styles.chatDescription}>
            {" "}
            Tap to chat ⋅ {getTimeLabel(currMillis - item.lastUpdated)}{" "}
          </Text>
      
        </ListItem.Subtitle>
       
      </ListItem.Content>
    </ListItem>
  );
}

const getTimeLabel = (millis_diff) => {
  if (millis_diff < 0) millis_diff = 0;
  if (millis_diff < MILLIS_IN_HOUR)
    return `${Math.floor(millis_diff / MILLIS_IN_MIN)}m`;
  if (millis_diff < MILLIS_IN_DAY)
    return `${Math.floor(millis_diff / MILLIS_IN_HOUR)}h`;
  if (millis_diff < MILLIS_IN_WEEK)
    return `${Math.floor(millis_diff / MILLIS_IN_DAY)}d`;
  if (millis_diff >= MILLIS_IN_WEEK)
    return `${Math.floor(millis_diff / MILLIS_IN_WEEK)}w`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  subtitle: {
    color: Colors.snapgray,
    fontSize: 14,
    flex: 1,
    flexDirection: "row",
    maxHeight: 20,
  },
  chatItemContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.lightgray,
    padding: 20,
  },
  chatIcon: {
    height: 10,
    width: 12,
  },
  chatDescription: {
    marginLeft: 3,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  iconing:
  {
    position: "absolute",
    right: 10.25,
    top: 5,
    bottom: 0,
    transform: [{rotateY: "180deg"}],
  },
  line:
  {
    position: "absolute",
    width: 1,
    height: 38.43,
    right: 64,
    backgroundColor: '#C4C4C4',
  }
});
