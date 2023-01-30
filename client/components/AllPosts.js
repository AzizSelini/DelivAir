//import liraries
import * as React from "react";
import { Box, HStack, Center, Heading, ScrollView } from "native-base";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { Linking, Platform } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Footer from "./Footer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import { async } from "@firebase/util";
import Alert from "./Alert";
import { useToast } from "native-base";
const friends = [
  {
    name: "Amine Amdouni",
    email: "amouna@gmail.com",
    phone: "123-456-7890",
    country: "United States",
    profileImage:
      "https://cdn.discordapp.com/attachments/1030292601489854626/1059141791535874099/FC88AABF-AEB3-4CBC-BEE4-5477C6CF3CE7.jpg",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    phone: "098-765-4321",
    country: "Canada",
    profileImage: "https://picsum.photos/200",
  },
  {
    name: "Wiem Mimouni",
    email: "mimouni@gmail.com",
    phone: "123-456-7890",
    country: "tunisia",
    profileImage:
      "https://res.cloudinary.com/duqxezt6m/image/upload/v1671620160/me_kosu6u_p95f3v.jpg",
  },
  {
    name: "Mahdi Dissem",
    email: "midox@gmail.com",
    phone: "123-456-7890",
    country: "tunisia",
    profileImage:
      "https://cdn.discordapp.com/attachments/1030292601489854626/1059141724955484200/1FCD701D-518F-48E5-98DF-F99CC2DB91C4.jpg",
  },
  {
    name: "Abderrahim Ouertani",
    email: "abdouu@gmail.com",
    phone: "123-456-7890",
    country: "tunisia",
    profileImage:
      "https://cdn.discordapp.com/attachments/1030292601489854626/1059141955470229585/D7C1F79F-0816-4479-9397-1CF6493F9CD7.jpg",
  },
];

export default function AllPosts({ navigation }) {
  //----------
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

  //----------
  React.useEffect(() => {
    axios

      .get(`http://192.168.94.101:5001/posts`)

      .then((res) => {
        setPosts(res.data);
        Ale(
          "success",
          res.data.length + " people posted!",
          "Make sure to verify everything before sending goods !"
        );
      })
      .catch((err) => Ale("error", "oups", err));
  }, []);

  const relativeDate = (param) => {
    var olddate = new Date(param);
    var oldseconds = olddate.getTime() / 1000; //1440516958
    const date = new Date();
    const timestamp = date.getTime();
    const seconds = Math.floor(timestamp / 1000);
    const difference = seconds - oldseconds;
    let output = ``;
    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} seconds ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hours ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor(difference / 86400)} days ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor(difference / 2620800)} months ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor(difference / 31449600)} years ago`;
    }
    return output;
  };
  const convertTime = (pa) => {
    return pa.slice(0, pa.length - 6) + " UTC " + pa.slice(pa.length - 6);
  };

  const { setOneUser, contactList } = useContext(UserContext);
  const [posts, setPosts] = useState("");
  const dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View>
      <Box>
        <Box backgroundColor={"#FFC8CE"}>
          <Box style={styles.Header}>
            <HStack>
              <Center>
                <Heading style={styles.logo}>Delivair</Heading>
              </Center>
            </HStack>
          </Box>
        </Box>
      </Box>
      <ScrollView>
        {posts &&
          posts.map((e, i) => {
            console.log(e, "eeeee");
            let test;
            axios

              .get(`http://192.168.94.101:5001/users/id/${e.poster_id}`)

              .then((res) => (test = res.data));
            console.log(test, "titi");
            return (
              <View style={styles.friendItem}>
                <TouchableOpacity
                  onPress={async () => {
                    await axios

                      .get(`http://192.168.94.101:5001/users/id/${e.poster_id}`)

                      .then((res) => {
                        setOneUser(res.data);
                      });

                    navigation.navigate("otherprofile");
                  }}
                >
                  <Image
                    source={{ uri: e.poster_image }}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{e.poster_name}</Text>
                  <Text style={styles.friendEmail}>
                    <MaterialCommunityIcons
                      name="weight-kilogram"
                      size={20}
                      color="#FFC8CE"
                    ></MaterialCommunityIcons>{" "}
                    :{" "}
                    <Text style={{ color: "#5FC8C0", fontWeight: "bold" }}>
                      {e.weight}
                    </Text>
                  </Text>
                  <Text style={styles.friendPhone}>
                    <MaterialCommunityIcons
                      name="clock-time-eight-outline"
                      size={20}
                      color="#FFC8CE"
                    ></MaterialCommunityIcons>{" "}
                    Going Tomorrow
                  </Text>
                  <Text style={styles.friendCountry}>
                    <MaterialCommunityIcons
                      name="airplane-marker"
                      size={20}
                      color="#FFC8CE"
                    ></MaterialCommunityIcons>{" "}
                    : {convertTime(e.departTime)}
                  </Text>

                  <Text>
                    <MaterialCommunityIcons
                      name="message"
                      size={20}
                      color="#FFC8CE"
                    ></MaterialCommunityIcons>{" "}
                    : {e.content}
                  </Text>
                </View>
                <View
                  style={{
                    height: 80,
                    marginTop: 15,
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity onPress={() => dialCall(friends[0].phone)}>
                    <AntDesign
                      name="phone"
                      color={"#5FC8C0"}
                      size={25}
                    ></AntDesign>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    backgroundColor: "#FFC8CE",
    paddingTop: 80,
    width: 500,
    height: 100,
    left: 0,
    top: -33,
    ImageBackground:
      "https://i.ibb.co/S6BX4nQ/eberhard-grossgasteiger-j-CL98-LGaeo-E-unsplash.jpg",
    alignContent: "middle",
  },
  logo: {
    color: "white",
    width: 143,
    height: 48,
    left: 20,
    top: 10,
    fontSize: 30,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    borderRadius: 30,
    padding: 20,
    backgroundColor: "white",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  friendEmail: {
    fontSize: 16,
  },
  friendPhone: {
    fontSize: 16,
  },
  friendCountry: {
    fontSize: 16,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#5FC8C0",
  },
});
