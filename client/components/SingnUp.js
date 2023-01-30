import React, { useContext, useState } from "react";

import {
  Text,
  Center,
  Heading,
  VStack,
  Box,
  Button,
  Checkbox,
  Image,
  Input,
  Flex,
  Divider,
  Icon,
  HStack,
  Link,
  useToast,
  Modal,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//-----------------------
import { UserContext } from "../UserContext";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [dataInput, setDataInput] = useState([]);
  const { setUser, setConnected, setChatUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [terms, setTerms] = useState(false);

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
  console.log(terms);
  //SignUp function
  const SignUpUser = () => {
    console.log("click");
    const info = { Email: Email, passw: password };
    setDataInput([info]);
    createUserWithEmailAndPassword(auth, Email, password)
      .then((res) => {
        console.log("firebase succ");
        axios

          .post("http://192.168.94.101:3000/api/users/register", {
            email: Email,
            password,
            username,
          })
          .then((res) => {
            console.log(res.data.user);

            setConnected(res.data.user);
            setChatUser(res.data.user);
            navigation.navigate("notices");
            Ale("success", "Welcome!", "Have fun and respect everyone !");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        Ale("error", "error", JSON.stringify(err.code));
      });
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
              style={style.logoSignUp}
              source={{
                uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443763/1_swzwcw.png",
              }}
              alt="Alternate Text"
            />
          </Center>
          <VStack space={1} alignItems="center">
            <Heading color={"white"} size="lg">
              SignUp
            </Heading>
            <Box space={5} alignItems="center" style={{ marginBottom: "40%" }}>
              <Text style={style.Text}>Username</Text>
              <Box alignItems="center">
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  placeholderTextColor={"white"}
                  mx="4"
                  placeholder="Username"
                  style={style.Input}
                  size="l"
                  shadow="12"
                  onChangeText={(text) => setUsername(text)}
                />
              </Box>
              <Text style={style.Text}>Email</Text>
              <Box alignItems="center">
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  mx="4"
                  type="email"
                  placeholderTextColor={"white"}
                  placeholder="Email"
                  style={style.Input}
                  size="l"
                  shadow="12"
                  onChangeText={(text) => setEmail(text)}
                />
              </Box>
              <Text style={style.Text}>Password</Text>
              <Box alignItems="center">
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  type="password"
                  mx="4"
                  placeholderTextColor={"white"}
                  placeholder="Password"
                  style={style.Input}
                  onChangeText={(text) => setPassword(text)}
                  size="l"
                  shadow="12"
                />
              </Box>
              <Text style={style.Text}>Confirm Password</Text>
              <Box alignItems="center">
                <Input
                  variant="rounded"
                  borderColor={"white"}
                  type="password"
                  mx="4"
                  placeholderTextColor={"white"}
                  placeholder="Confirm Password"
                  style={style.Input}
                  onChangeText={(text) => setConfirm(text)}
                  size="l"
                  shadow="12"
                />
              </Box>
              <HStack space={6}>
                <Box>
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Text marginTop="5" color="white">
                      <MaterialCommunityIcons
                        name="alert-circle"
                        size={20}
                        color="#FFC8CE"
                      ></MaterialCommunityIcons>
                      Please click here to accept Terms & conditions
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Modal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  _backdrop={{
                    _dark: {
                      bg: "coolGray.800",
                    },
                    bg: "warmGray.50",
                  }}
                >
                  <Modal.Content maxWidth="350" maxH="700">
                    <Modal.CloseButton />
                    <Modal.Header>Terms and conditions</Modal.Header>
                    <Modal.Body>
                      <Text>
                        DelivAir's licensed to You (End-User), located and
                        registered at 04 rue des roses, tunis, tunisie 2070,
                        Tunisia ("Licensor"), for use only under the terms of
                        this License Agreement.
                        <Text fontWeight="bold">
                          We note that we are not responsible for any loss or
                          theft of products, we are only a contact intermediary
                          that helps people connect through our app.
                        </Text>
                        By downloading the Licensed Application from Apple's
                        software distribution platform ("App Store"), and
                        accepting the terms on signing up (as permitted by this
                        License Agreement), You indicate that You agree to be
                        bound by all of the terms and conditions of this License
                        Agreement, and that You accept this License Agreement.
                        App Store is referred to in this License Agreement as
                        "Services." The parties of this License Agreement
                        acknowledge that the Services are not a Party to this
                        License Agreement and are not bound by any provisions or
                        obligations with regard to the Licensed Application,
                        such as warranty, liability, maintenance and support
                        thereof. DelivAir, not the Services, is solely
                        responsible for the Licensed Application and the
                        content. This License Agreement may not provide for
                        usage rules for the Licensed Application that are in
                        conflict with the latest Apple Media Services Terms and
                        Conditions ("Usage Rules"). DelivAir acknowledges that
                        it had the opportunity to review the Usage Rules and
                        this License Agreement is not conflicting with them.
                        When downloaded through the Store, it is licensed to You
                        for use only under the terms of this License Agreement.
                        The Licensor reserves all rights not expressly granted
                        to You. DelivAir is to be used on devices that operate
                        with Apple's operating systems ("iOS" and "Mac
                        OS").DelivAir's licensed to You (End-User), located and
                        registered at 04 rue des roses, tunis, tunisie 2070,
                        Tunisia ("Licensor"), for use only under the terms of
                        this License Agreement. By downloading the Licensed
                        Application from Apple's software distribution platform
                        ("App Store"), and accepting the terms on signing up (as
                        permitted by this License Agreement), You indicate that
                        You agree to be bound by all of the terms and conditions
                        of this License Agreement, and that You accept this
                        License Agreement. App Store is referred to in this
                        License Agreement as "Services." The parties of this
                        License Agreement acknowledge that the Services are not
                        a Party to this License Agreement and are not bound by
                        any provisions or obligations with regard to the
                        Licensed Application, such as warranty, liability,
                        maintenance and support thereof. DelivAir, not the
                        Services, is solely responsible for the Licensed
                        Application and the content. This License Agreement may
                        not provide for usage rules for the Licensed Application
                        that are in conflict with the latest Apple Media
                        Services Terms and Conditions ("Usage Rules"). DelivAir
                        acknowledges that it had the opportunity to review the
                        Usage Rules and this License Agreement is not
                        conflicting with them. When downloaded through the
                        Store, it is licensed to You for use only under the
                        terms of this License Agreement. The Licensor reserves
                        all rights not expressly granted to You. DelivAir is to
                        be used on devices that operate with Apple's operating
                        systems ("iOS" and "Mac OS").
                      </Text>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button
                          variant="ghost"
                          colorScheme="blueGray"
                          onPress={() => {
                            setShowModal(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="subtle"
                          onPress={() => {
                            setShowModal(false);
                            setTerms(true);
                          }}
                        >
                          Accept!
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
                {/* </Checkbox> */}
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
                  {terms ? (
                    <Button
                      variant="subtle"
                      className="LoginButton"
                      onPress={SignUpUser}
                      style={style.LoginButton}
                    >
                      SignUp
                    </Button>
                  ) : (
                    <Button
                      variant="subtle"
                      className="LoginButton"
                      onPress={SignUpUser}
                      style={style.LoginButton}
                      isDisabled
                    >
                      SignUp
                    </Button>
                  )}
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
    padding: 5,
    textAlign: "left",
    alignSelf: "flex-start",
    textAlign: "right",
    paddingLeft: 20,
    color: "white",
  },
  forgot: {
    marginTop: 10,
  },
  logoSignUp: {
    Top: 5000,
  },
});
