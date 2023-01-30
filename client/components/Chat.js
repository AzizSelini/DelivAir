import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Alert,
  Text,
  Heading,
  VStack,
  Box,
  Avatar,
  Input,
  Icon,
  HStack,
} from "native-base";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "./Footer";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imaage = {
  uri: "https://i.ibb.co/S6BX4nQ/eberhard-grossgasteiger-j-CL98-LGaeo-E-unsplash.jpg",
};
import { UserContext } from "../UserContext";
import axios from "axios";

import { TouchableOpacity } from "react-native-gesture-handler";
export default function Chat({ navigation }) {
  const { user, setTo, contactList } = useContext(UserContext);
  const [allUsers, getAllUsers] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  // console.log(allUsers);

  useEffect(() => {
    forceUpdate();
  }, [user]);
  console.log(contactList);
  useEffect(() => {
    axios
      .get(
        "http://192.168.94.101:3000/api/users/allusers/63bc585f004eb697059c2a7d"
      )
      .then((res) => {
        console.log(res.data.filter((e) => contactList.includes(e.email)));
        getAllUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box style={{ backgroundColor: "#FFC8CE" }}>
      <Box style={styles.header}>
        <Heading fontSize="2xl" style={styles.heading}>
          Messages
        </Heading>
      </Box>
      <Box style={styles.container}>
        <Box style={styles.containerTop}>
          <Box style={styles.SearchBar}>
            <Input
              variant="rounded"
              placeholder="Search"
              backgroundColor={"rgba(0,0,0,0.1)"}
              width="100%"
              mx="4"
              right={4}
              borderColor="white"
              fontSize="lg"
              py="1"
              px="2"
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
            />
          </Box>

          <ScrollView horizontal={true}>
            {allUsers.map((e) => {
              return (
                <Box style={styles.contact}>
                  <HStack>
                    <Avatar
                      marginLeft={5}
                      size="lg"
                      source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      <Avatar.Badge bg="green.500" />
                    </Avatar>
                  </HStack>
                </Box>
              );
            })}
          </ScrollView>
        </Box>
        <ScrollView useWindowScrolling={true}>
          <Box height={windowHeight}>
            {allUsers.map((e) => {
              return (
                <VStack>
                  <TouchableOpacity
                    onPress={() => {
                      setTo(e._id);
                      navigation.navigate("messages");
                    }}
                  >
                    <HStack style={styles.message} key={e._id}>
                      {e.isAvatarImageSet ? (
                        <Avatar
                          marginLeft={5}
                          size="lg"
                          source={{
                            uri: e.avatarImage,
                          }}
                        ></Avatar>
                      ) : (
                        <Avatar
                          marginLeft={5}
                          size="lg"
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2aSUcU-KC_ZGl1KIFES1pwRe4YOMv2gPx_g&usqp=CAU",
                          }}
                        ></Avatar>
                      )}
                      <VStack style={styles.textContainer}>
                        <Text fontWeight={700} fontSize={20}>
                          {e.username}
                        </Text>
                        <Text fontWeight={300} fontSize={20}>
                          {e.email}
                        </Text>
                      </VStack>
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
      <Footer navigation={navigation} />
    </Box>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginStart: 10,
    fontWeight: "bold",
    color: "white",
  },
  containerTop: {
    backgroundColor: "white",
    borderRadius: 40,
  },
  message: {
    padding: 15,
  },
  header: {
    backgroundColor: "#FFC8CE",
    width: windowWidth,
    top: windowHeight - (windowHeight - 60),
    height: windowHeight - (windowHeight - 80),
    marginBottom: 30,
  },
  container: {
    backgroundColor: "#F5F6F1",
    height: windowHeight,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
  },
  contact: {
    marginTop: 20,
    marginLeft: 5,
    padding: 20,
  },
  textContainer: {
    paddingStart: 20,
  },
  SearchBar: { marginTop: 20, paddingEnd: 10, paddingStart: 10 },
});
