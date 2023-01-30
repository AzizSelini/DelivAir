import { VStack, HStack, useDisclose, Badge, Center } from "native-base";
import { UserContext } from "../UserContext";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import ActionSheet from "./ActionSheet";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useContext } from "react";
export default function Footer({ navigation, focused }) {
  const { selected, setSelected } = useContext(UserContext);

  return (
    <VStack style={style.footer} shadow={20}>
      <HStack justifyContent="space-between" shadow={9}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("home");
            setSelected("home");
          }}
        >
          <MaterialCommunityIcons
            name="home-outline"
            color={selected === "home" ? "black" : "#5FC8C0"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("chat");
            navigation.navigate("chat");
          }}
        >
          <MaterialCommunityIcons
            name="chat-outline"
            color={selected === "chat" ? "black" : "#5FC8C0"}
            size={30}
          />
        </TouchableOpacity>
        <ActionSheet
          navigation={navigation}
          styles={style.middleButton}
          icon={
            <MaterialCommunityIcons name="plus" color={"white"} size={25} />
          }
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("track");
            setSelected("radar");
          }}
        >
          {
            <Badge // bg="red.400"
              colorScheme="danger"
              rounded="full"
              mb={-4}
              mr={-4}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 8,
              }}
            >
              2
            </Badge>
          }
          <MaterialCommunityIcons
            name="radar"
            color={selected === "radar" ? "#5FC8C0" : "#5FC8C0"}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelected("account");
            navigation.navigate("profile");
          }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            color={selected === "account" ? "black" : "#5FC8C0"}
            size={30}
          />
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
const style = StyleSheet.create({
  footer: {
    position: "absolute",
    height: 150,
    backgroundColor: "white",
    top: windowHeight - 70,
    width: windowWidth,
    padding: 10,
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: "grey",
  },
  actionSheet: {
    backgroundColor: "#B1C4CB",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  middleButton: {
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 15,
    width: windowWidth,
    width: 55,
    height: 55,
    backgroundColor: "#FFC8CE",
    borderRadius: 30,
    marginBottom: 200,
    alignItems: "center",
    justifyContent: "center",
    shadow: 9,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: "grey",
  },
});
