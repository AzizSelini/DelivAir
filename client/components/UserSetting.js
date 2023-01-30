import { StyleSheet, View, Button, Text, TouchableOpacity } from "react-native";
import {
  Box,
  Flex,
  Divider,
  Avatar,
  Input,
  HStack,
  VStack,
  ScrollView,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

//---------Firebase---------
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCVBbACohSkuUr0FntAmt9BvMUK-RkpY-E",
  authDomain: "delivair-959e9.firebaseapp.com",
  projectId: "delivair-959e9",
  storageBucket: "delivair-959e9.appspot.com",
  messagingSenderId: "1084409904306",
  appId: "1:1084409904306:web:03f5e420eb889f115d1dab",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);

//------------firebase-----------
import { useState } from "react";
const PersonalInformationForm = () => {
  const [selected, setSelected] = useState("settings");
  const [settings, setSettings] = useState("settings");
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [progress, setProgress] = useState(0);

  const [history, setHistory] = useState(null);
  const changed = (pressed) => {
    if (pressed === "settings") {
      setSettings("settings");
      setHistory(null);
      setPosts(null);
    }
    if (pressed === "posts") {
      setPosts("posts");
      setHistory(null);
      setSettings(null);
    }
    if (pressed === "history") {
      setHistory("history");
      setPosts(null);
      setSettings(null);
    }
  };
  //------------firebase upload picture---------

  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    setProgress(0);
    setLoading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`Pictures/Image2`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        alert(error);
        blob.close();
        Ale("error", "Oups there is an error", "Try again please!");
        return;
      },

      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          Ale(
            "success",
            "Upload successful",
            "You can submit now! (don't forget to fill the rest of the form!"
          );
          setUploading(false);
          setProgress(100);
          console.log("Download URL: ", url);
          setImage(url);
          setLoading(false);
          blob.close();
          return url;
        });
      }
    );
  };

  //----------end of firebase upload picture----

  return (
    <Box backgroundColor={"#5FC8C0"} height={1000}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Avatar
            top={200}
            bg="lightBlue.400"
            size="xl"
            borderRadius={100}
            source={{ uri: image }}
            alt="Alternate Text"
            alignSelf="center"
          ></Avatar>
        ) : (
          <Avatar
            borderColor={"black"}
            borderWidth={1}
            size="xl"
            alignSelf="center"
            top={200}
            borderRadius={100}
            source={{
              uri: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            }}
            alt="Alternate Text"
          />
        )}
      </TouchableOpacity>

      <Box top={250} alignItems="center">
        <Flex direction="row" h="58" p="4">
          <HStack>
            <TouchableOpacity
              onPress={() => {
                changed("settings");
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: "16" }}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </HStack>
          <Divider bg="#FFC8CE" thickness="2" mx="2" orientation="vertical" />
          <HStack>
            <TouchableOpacity
              onPress={() => {
                changed("posts");
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: "16" }}
              >
                Posts
              </Text>
            </TouchableOpacity>
          </HStack>
          <Divider bg="#FFC8CE" thickness="2" mx="2" orientation="vertical" />
          <HStack>
            <TouchableOpacity
              onPress={() => {
                changed("history");
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: "16" }}
              >
                History
              </Text>
            </TouchableOpacity>
          </HStack>
        </Flex>
      </Box>
      {settings && (
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.labelText}>Full Name</Text>
              </View>
              <View style={styles.inputColumn}>
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="0"
                  size="l"
                  style={styles.input}
                  placeholder="John Doe"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.labelText}>Email</Text>
              </View>
              <View style={styles.inputColumn}>
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="0"
                  size="l"
                  style={styles.input}
                  placeholder="john@example.com"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.labelText}>Phone</Text>
              </View>
              <View style={styles.inputColumn}>
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="0"
                  size="l"
                  style={styles.input}
                  placeholder="(239) 816-9029"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.labelText}>Mobile</Text>
              </View>
              <View style={styles.inputColumn}>
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="0"
                  size="l"
                  style={styles.input}
                  placeholder="(320) 380-4539"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.labelText}>Address</Text>
              </View>
              <View style={styles.inputColumn}>
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="0"
                  size="l"
                  style={styles.input}
                  placeholder="Bay Area, San Francisco, CA"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.emptyColumn} />
              <View style={styles.buttonColumn}>
                <Button title="Save Changes" color="white" />
              </View>
            </View>
          </View>
        </View>
      )}
      {posts && (
        <View style={styles.card}>
          <ScrollView h="80">
            <Box>
              <VStack space={4} alignItems="center">
                <Box
                  w="64"
                  h="20"
                  bg="#7CE4DC"
                  rounded="md"
                  shadow={3}
                  shadowColor={"white"}
                >
                  <HStack>
                    <Avatar
                      bg="green.500"
                      left={2}
                      top={1}
                      size="xs"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    ></Avatar>
                    <Box left={200}>
                      <AntDesign color={"red"} name="delete" />
                    </Box>
                  </HStack>
                  <Text style={{ color: "grey", left: 27, width: 230 }}>
                    {" "}
                    I have 2 kilos from Tunisa to Paris 5 February{" "}
                  </Text>
                </Box>

                <Box
                  w="64"
                  h="20"
                  bg="#99FFF8"
                  rounded="md"
                  shadow={3}
                  shadowColor={"white"}
                >
                  <HStack>
                    <Avatar
                      bg="green.500"
                      left={2}
                      top={1}
                      size="xs"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    ></Avatar>
                    <Box left={200}>
                      <AntDesign color={"red"} name="delete" />
                    </Box>
                  </HStack>
                  <Text style={{ color: "grey", left: 27, width: 230 }}>
                    {" "}
                    I have 2 kilos from Tunisa to Paris 2 March{" "}
                  </Text>
                </Box>
                <Box
                  w="64"
                  h="20"
                  bg="#B6FFFF"
                  rounded="md"
                  shadow={3}
                  shadowColor={"white"}
                >
                  <HStack>
                    <Avatar
                      bg="green.500"
                      left={2}
                      top={1}
                      size="xs"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    ></Avatar>
                    <Box left={200}>
                      <AntDesign color={"red"} name="delete" />
                    </Box>
                  </HStack>
                  <Text style={{ color: "grey", left: 27, width: 230 }}>
                    {" "}
                    I have 2 kilos from Tunisa to Paris 20 January{" "}
                  </Text>{" "}
                </Box>
              </VStack>
            </Box>
          </ScrollView>
        </View>
      )}
      {history && (
        <View style={styles.card}>
          <Box
            alignSelf={"center"}
            w="64"
            h="300"
            bg="#B6FFFF"
            rounded="md"
            shadow={1}
            shadowColor={"white"}
          >
            <ScrollView>
              <Box marginTop={8}>
                <Avatar
                  alignSelf={"center"}
                  bg="green.500"
                  left={2}
                  top={1}
                  size="xs"
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                ></Avatar>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 10,
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  added new post
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 17,
                    color: "grey",
                    fontSize: 10,
                  }}
                >
                  21/02/2021
                </Text>
              </Box>
              <Box>
                <Avatar
                  alignSelf={"center"}
                  bg="green.500"
                  left={2}
                  top={8}
                  size="xs"
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                ></Avatar>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 35,
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  reserved new Delivair
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 40,
                    color: "grey",
                    fontSize: 10,
                  }}
                >
                  13/09/2021
                </Text>
              </Box>
              <Box>
                <Avatar
                  alignSelf={"center"}
                  bg="green.500"
                  left={2}
                  top={49}
                  size="xs"
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                ></Avatar>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 55,
                    color: "grey",
                    fontWeight: "bold",
                  }}
                >
                  changed profile photo
                </Text>
                <Text
                  style={{
                    alignSelf: "center",
                    top: 60,
                    color: "grey",
                    fontSize: 10,
                  }}
                >
                  10/06/2021
                </Text>
              </Box>
            </ScrollView>
          </Box>
        </View>
      )}
    </Box>
  );
};
const styles = StyleSheet.create({
  card: {
    top: 300,
    backgroundColor: "#5FC8C0",
    borderRadius: 4,
    marginBottom: 1.5,
    shadowColor: "#dadae3",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
  },
  cardBody: {
    padding: 70,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  labelColumn: {
    width: 80,
    right: 30,
  },
  labelText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  inputColumn: {
    flex: 1,
  },
  input: {},
  emptyColumn: {
    width: 80,
  },
  buttonColumn: {
    left: 80,
    top: 20,
  },
});

export default PersonalInformationForm;
