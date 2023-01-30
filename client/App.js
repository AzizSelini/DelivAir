import React, { useState, useEffect } from "react";

import { Text, HStack, Switch, useColorMode, extendTheme } from "native-base";

import axios from "axios";

import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "./UserContext";
import Stacks from "./components/StackNavigator";
import { NativeBaseProvider } from "native-base";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
const auth = getAuth();
// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme

import { async } from "@firebase/util";

export const theme = extendTheme({ config });
export default function App() {
  const [connected, setConnected] = useState(null);
  const [user, setUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [oneUser, setOneUser] = useState(null);
  const [onePost, setOnePost] = useState(null);
  const [to, setTo] = useState(null);
  const [contactList, setContactList] = useState(null);
  const [contactArray, setcontactArray] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  const [selected, setSelected] = useState("home");
  const [initializing, setInitializing] = useState(true);
  var [socket, setSocket] = useState("");
  //Checking if there is a user connected

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (initializing) {
        setInitializing(false);
      }
      if (user === null) {
        navigation.navigate("login");
      }
    });
  }, [connected]);
  useEffect(() => {
    if (user) {
      axios
        .get(`http://192.168.94.101:5001/users/id/${user.user_id}`)
        .then((res) => {
          setUser(res.data);
        });
    }
  }, [connected]);
  useEffect(() => {
    if (user) {
      setcontactArray(user.contactList);

      setPendingArray(user.pendingRequests);
      console.log("hi again");
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      let contact = [];

      for (let i = 0; i < user.contactList.length; i++) {
        axios

          .get(`http://192.168.94.101:5001/users/${user.contactList[i]}`)

          .then((res) => {
            contact.push(res.data);
          });
      }
      let pending = [];

      for (let i = 0; i < user.pendingRequests.length; i++) {
        axios

          .get(`http://192.168.94.101:5001/users/${user.pendingRequests[i]}`)

          .then((res) => {
            pending.push(res.data);
          });
      }
      setTimeout(() => {
        setPendingList(pending);
        setContactList(contact);
      }, 1);
    }
    console.log("hi again again");
  }, [contactArray, pendingArray]);
  useEffect(() => {
    console.log(
      contactList,
      "================================>==================================>",
      pendingList
    );
  }, [contactList]);
  console.log(user, "user");
  console.log(chatUser, "chat");
  console.log(connected, "connected");

  console.log(contactArray, "contact array");

  return (
    <UserContext.Provider
      value={{
        chatUser,
        setChatUser,
        user,
        setUser,
        selected,
        setSelected,
        connected,
        setConnected,
        oneUser,
        setOneUser,
        onePost,
        setOnePost,
        to,
        setTo,
        socket,
        setSocket,
        contactList,
        contactArray,
        setContactList,
        setcontactArray,
        pendingList,
      }}
    >
      <NativeBaseProvider>
        <NavigationContainer>
          <Stacks />
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContext.Provider>
  );
}
