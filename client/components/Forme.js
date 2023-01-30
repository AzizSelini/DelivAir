import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Image, Input, Center, Avatar, Box, useToast } from "native-base";

import * as ImagePicker from "expo-image-picker";
import ProgressBar from "react-native-animated-progress";
import Alert from "./Alert";

import axios from "axios";

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
import { UserContext } from "../UserContext";
const SignUpForm = ({ navigation }) => {
  const { user, connected, setUser } = useContext(UserContext);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  console.log(connected, "connectedd");
  useEffect(() => {
    forceUpdate();
  }, [user]);
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [progress, setProgress] = useState(0);

  //---------------------alerts-----------------
  const toast = useToast();
  const Ale = (status, title, description) => {
    toast.show({
      render: ({ id }) => {
        return (
          <Alert
            id={id}
            status={status}
            variant={"left-accent"}
            title={title}
            description={description}
            isClosable={true}
          />
        );
      },
    });
  };
  //---------------------------------------------

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

  const handleSubmit = () => {
    console.log("submit");
    console.log({
      userName,
      phoneNumber: Number(phoneNumber),
      location,
      image,
      email: connected.email,
    });
    axios

      .post("http://192.168.94.101:5001/users", {
        userName,
        phoneNumber: Number(phoneNumber),
        location,
        image,
        email: connected.email,
      })
      .then((response) => {
        console.log("refresh");
        axios

          .get(`http://192.168.94.101:5001/users/${response.data.email}`)

          .then((res) => {
            setUser(res.data);
            if (res.data.verfied == false) {
              console.log(res.data.verified);
              navigation.navigate("unverfied");
            } else if (res.data.banned == true) {
              navigation.navigate("banned");
            } else {
              navigation.navigate("home");
            }
            Ale("success", "Thank you for updating your profile", "Enjoy!");
          });
      })
      .catch((error) => {
        console.log(error);
        Ale("error", "An error occured", "Please fill up everything!");
      });
  };

  return (
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443612/Sans_titre_4_tv1aq8.gif",
      }}
      style={styles.image}
    >
      <View style={styles.container}>
        <Center>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Avatar
                bottom={100}
                bg="lightBlue.400"
                size={100}
                borderRadius={100}
                source={{ uri: image }}
                alt="Alternate Text"
              ></Avatar>
            ) : (
              <Avatar
                borderColor={"black"}
                borderWidth={1}
                bottom={100}
                size={100}
                borderRadius={100}
                source={{
                  uri: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
                }}
                alt="Alternate Text"
              />
            )}
          </TouchableOpacity>
          <ProgressBar
            progress={progress}
            height={7}
            backgroundColor="#4a0072"
          />
          <View style={styles.activityIndicator}>
            <AntDesign size={16} name="edit"></AntDesign>
          </View>
        </Center>

        <Text style={styles.title2}>Welcome! let's create your profile</Text>
        <Box right={1}>
          <Text style={styles.title}>Username</Text>
          <Input
            variant="rounded"
            borderColor={"white"}
            placeholderTextColor={"white"}
            mx="-5"
            size="l"
            placeholder="Username"
            value={userName}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
          <Text style={styles.title}>Phone Number</Text>
          <Input
            variant="rounded"
            borderColor={"white"}
            placeholderTextColor={"white"}
            mx="-5"
            size="l"
            keyboardType="number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhone(text)}
            style={styles.input}
          />

          <View></View>

          <Text style={styles.title}>Add your Location</Text>
          <Input
            variant="rounded"
            borderColor={"white"}
            placeholderTextColor={"white"}
            mx="-5"
            size="l"
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
            style={styles.input}
          />
        </Box>
        <Box top={20}>
          <Button
            variant="subtle"
            isLoading={loading}
            title="confirm"
            onPress={handleSubmit}
          >
            Submit
          </Button>
          <Button
            style={styles.buttonupload}
            variant="subtle"
            isLoading={loading}
            title="upload"
            onPress={uploadImage}
          >
            Upload
          </Button>
        </Box>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundSize: "cover",
  },
  title2: {
    bottom: 50,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    padding: 10,
    right: 20,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    height: 1000,
    width: 420,
    marginBottom: 0,
  },
  button: {
    top: 300,
  },
  buttonupload: {
    bottom: 490,
  },
  activityIndicator: {
    backgroundColor: "#d8d8d8",
    height: 20,
    width: 20,
    borderRadius: 10,
    bottom: 130,
    right: 43,
    borderColor: "white",
    borderWidth: 1,
  },
});

export default SignUpForm;
