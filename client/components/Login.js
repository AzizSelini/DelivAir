import React, { useContext, useState } from "react";

import {
  Text,
  Link,
  Center,
  Heading,
  VStack,
  Box,
  Button,
  Image,
  Input,
  Flex,
  Divider,
  Icon,
  HStack,
  useToast,
} from "native-base";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Alert from "./Alert";
//--------- We need to secure this amine !------
const firebaseConfig = {
  apiKey: "AIzaSyCVBbACohSkuUr0FntAmt9BvMUK-RkpY-E",
  authDomain: "delivair-959e9.firebaseapp.com",
  projectId: "delivair-959e9",
  storageBucket: "delivair-959e9.appspot.com",
  messagingSenderId: "1084409904306",
  appId: "1:1084409904306:web:03f5e420eb889f115d1dab",
};

const app = initializeApp(firebaseConfig);

//-------------------------
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth();
import { UserContext } from "../UserContext";
import axios from "axios";

import socketIO from "socket.io-client";

export default function Login({ navigation }) {
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
  const { setUser, setChatUser, setSocket } = useContext(UserContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("firebase succ");
        axios

          .post("http://192.168.94.101:3000/api/users/login", {
            email,
            password,
          })
          .then((result) => {
            console.log(result.data, "mongosucc");
            setChatUser(result.data.user);
            axios

              .get(`http://192.168.94.101:5001/users/${result.data.user.email}`)
              .then((res) => {
                setUser(res.data);
                console.log(res.data.verified, "verdief");
                console.log(res.data.banned, "verdief");
                setSocket(socketIO.connect("http://192.168.94.101:3000"));
                if (res.data.verfied == false) {
                  console.log(res.data.verified);
                  navigation.navigate("unverfied");
                } else if (res.data.banned == true) {
                  navigation.navigate("banned");
                } else {
                  navigation.navigate("home");
                }

                Ale(
                  "success",
                  "login succussfully",
                  "welcome " + res.data.userName
                );
              });
          });
      })
      .catch((err) =>
        Ale("error", "error", "please check your email or password ")
      );
  };
  const resetPassword = () => {
    if (email != null) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Ale(
            "info",
            "password reset",
            "password reset email has been sent successfully"
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Ale("error", "error", "Please enter a valid email");
        });
    } else {
      Ale("error", "email error", "write an email before ");
    }
  };
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={3}
      flex={2}
    >
      <Image
        style={style.backgroundImage}
        source={{
          uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443612/Sans_titre_4_tv1aq8.gif",
        }}
        alt="*"
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding">
          <Center>
            <Image
              size={300}
              borderRadius={30}
              source={{
                uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443763/1_swzwcw.png",
              }}
              alt="Alternate Text"
            />
          </Center>
          <VStack space={10} alignItems="center">
            <Heading color={"white"} size="lg">
              Login
            </Heading>
            <Box space={5} alignItems="center" style={{ marginBottom: "40%" }}>
              <Text style={style.Text}>Email</Text>

              <Input
                variant="rounded"
                borderColor={"white"}
                placeholderTextColor={"white"}
                mx="4"
                size="l"
                placeholder="Email"
                style={style.Input}
                onChangeText={(text) => setEmail(text)}
              />

              <Text style={style.Text}>Password</Text>

              <Input
                variant="rounded"
                borderColor={"white"}
                type="password"
                mx="4"
                placeholder="Password"
                placeholderTextColor={"white"}
                style={style.Input}
                onChangeText={(text) => setPassword(text)}
                size="l"
              />

              <HStack space={90} justifyContent="center" style={style.forgot}>
                <Center>
                  <Link
                    onPress={() => {
                      navigation.navigate("signup");
                    }}
                  >
                    <Text color="white" underline fontSize={"15px"}>
                      Register Now
                    </Text>
                  </Link>
                </Center>

                <TouchableOpacity
                  style={{
                    margin: 10,
                    alignItems: "center",
                  }}
                  onPress={() => resetPassword()}
                >
                  <Text fontSize={"15px"} color={"white"}>
                    Forget Password ?
                  </Text>
                </TouchableOpacity>
              </HStack>

              <Box w={160}>
                <HStack space={10} justifyContent="center" style={style.forgot}>
                  <Divider my={2} />
                  <Text color={"white"}>OR</Text>
                  <Divider my={2} />
                </HStack>
                <Flex
                  mx={3}
                  direction="row"
                  justify="space-evenly"
                  style={style.forgot}
                >
                  <Link href="https://www.facebook.com/">
                    <Icon
                      as={MaterialCommunityIcons}
                      name="facebook"
                      color="white"
                      size={30}
                    />
                  </Link>
                  <Divider orientation="vertical" />
                  <Link href="https://gmail.com/">
                    <Icon
                      as={MaterialCommunityIcons}
                      name="google"
                      color="white"
                      size={30}
                    />
                  </Link>
                  <Divider orientation="vertical" />
                  <Link href="https://twitter.com/">
                    <Icon
                      as={MaterialCommunityIcons}
                      name="twitter"
                      color="white"
                      size={30}
                    />
                  </Link>
                </Flex>
              </Box>
              <Box>
                <Center>
                  <Button
                    variant="subtle"
                    className="LoginButton"
                    onPress={() => {
                      // navigation.navigate('tabs')
                      handleLogin();
                    }}
                    style={style.LoginButton}
                  >
                    Login
                  </Button>
                </Center>
              </Box>
            </Box>
          </VStack>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Center>
  );
}

const style = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "110%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "",
  },
  Input: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  LoginButton: {
    marginTop: "20%",
    borderRadius: 5,
    width: "70%",
  },
  Text: {
    fontWeight: "bold",
    color: "white",
    padding: 5,
    textAlign: "left",
    alignSelf: "flex-start",
    textAlign: "right",
    paddingLeft: 20,
  },
  forgot: {
    padding: 5,
  },
  logoSignUp: {
    marginTop: 40,
  },
});
