import { Button, Actionsheet, useDisclose, Text, Center } from "native-base";

import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";

import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import { useState } from "react";
export default function ActionSheet({ navigation, focused, icon, styles }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Center>
      <Button onPress={onOpen} style={styles}>
        {icon}
      </Button>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={style.actionSheet}>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons
                color={"white"}
                name="home-outline"
                size={26}
              />
            }
            onPress={() => navigation.navigate("main")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Home</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons color={"white"} name="chat" size={26} />
            }
            onPress={() => navigation.navigate("chat")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Chat</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons
                color={"white"}
                name="account"
                size={26}
              />
            }
            onPress={() => navigation.navigate("profile")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Profile</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons color={"white"} name="radar" size={26} />
            }
            onPress={() => navigation.navigate("track")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Track</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons
                color={"white"}
                name="history"
                size={26}
              />
            }
            onPress={() => navigation.navigate("history")}
          >
            <TouchableOpacity>
              <Text color={"white"}>History</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <FontAwesome5 color={"white"} name="user-friends" size={26} />
            }
            onPress={() => navigation.navigate("contact")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Contact List</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={<MaterialCommunityIcons color={"white"} name="post" size={26} />}
            onPress={() => navigation.navigate("allposts")}
          >
            <TouchableOpacity>
              <Text color={"white"}>All Posts</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={
              <MaterialCommunityIcons
                color={"white"}
                name="text-box-plus-outline"
                size={26}
              />
            }
            onPress={() => navigation.navigate("addpost")}
          >
            <TouchableOpacity>
              <Text color={"white"}>Add Post</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
          <Actionsheet.Item
            backgroundColor={"#5FC8C0"}
            startIcon={<AntDesign color={"white"} name="form" size={26} />}
            onPress={() => navigation.navigate("reclamation")}
          >
            <TouchableOpacity>
              <Text color={"white"}>reclamation</Text>
            </TouchableOpacity>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
const style = StyleSheet.create({
  actionSheet: {
    backgroundColor: "#5FC8C0",

    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
});
