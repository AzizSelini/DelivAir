import React, { useCallback, useContext, useEffect, useState } from "react";
import { StatusBar, ScrollView, StyleSheet } from "react-native";
import {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as S from "./profileTestcss";
import { Text, Box, Image, Center, HStack, useToast } from "native-base";
import { Menu, Pressable, HamburgerIcon, ChevronDownIcon } from "native-base";
import Footer from "../Footer";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();
import { UserContext } from "../../UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Alert from "../Alert";
export default function FlyContent({ navigation, posts }) {
  const { user, setUser, setOneUser, setConnected, setChatUser, contactList } =
    useContext(UserContext);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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

  useEffect(() => {
    forceUpdate();
  }, [user]);
  const headertranslateY = useSharedValue(-320);
  const headerContentTranslateY = useSharedValue(320);
  const headerContentopacity = useSharedValue(0);

  const headerAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headertranslateY.value }],
  }));

  const headerContentAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headerContentTranslateY.value }],
  }));

  useEffect(() => {
    headertranslateY.value = withTiming(0, { duration: 700 });
    headerContentTranslateY.value = withTiming(0, { duration: 900 });
    headerContentopacity.value = withTiming(1, { duration: 700 });
  }, []);

  function SignOut() {
    signOut(auth)
      .then((res) => {
        setUser(null);
        setChatUser(null);
        setConnected(null);
        Ale("success", "Logout successful", "Sorry to see you go !");

        navigation.navigate("login");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" />
      <S.Header style={headerAnimatedStyled}></S.Header>
      <S.HeaderContent style={headerContentAnimatedStyled}>
        <HStack justifyContent="space-between" space={220}>
          <Center>
            <Text left={120} color={"white"} fontSize={30} fontWeight={"bold"}>
              Profile
            </Text>
          </Center>

          <Box alignItems="center">
            <Menu
              w="130"
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    right={4}
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <ChevronDownIcon size={5} color="black" />
                  </Pressable>
                );
              }}
            >
              <Menu.Item>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("setting");
                  }}
                >
                  <HStack>
                    <MaterialCommunityIcons
                      name="account-edit-outline"
                      color="green"
                      size={17}
                    />
                    <Text>Edit Profile</Text>
                  </HStack>
                </TouchableOpacity>
              </Menu.Item>
              <Menu.Item onPress={() => SignOut()}>
                <HStack>
                  <MaterialCommunityIcons name="logout" color="red" size={17} />
                  <Text>Logout</Text>
                </HStack>
              </Menu.Item>
            </Menu>
          </Box>
        </HStack>
      </S.HeaderContent>
      <S.FlyInfo entering={FlipInXDown.duration(900).delay(100)}>
        <S.FlyInfoContent intensity={70}>
          <ScrollView>
            <Center alignItems="center">
              <Image
                size={150}
                borderRadius={100}
                source={{
                  uri: user.image,
                }}
                alt="Alternate Text"
              />
            </Center>

            <S.FlyInfoTwo entering={FlipInXDown.duration(900).delay(800)}>
              <Center alignItems="center">
                <S.LargeText
                  style={[styles.text, { fontWeight: "bold", fontSize: 34 }]}
                >
                  {user.userName}
                </S.LargeText>

                <Box marginRight={-50}>
                  <S.HeaderInfoText
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  >
                    Phone Number :
                    <Text style={{ color: "#36454F", fontSize: 17 }}>
                      {user.phoneNumber}
                    </Text>
                  </S.HeaderInfoText>
                </Box>
                <Box bottom={5} marginRight={-50} right={6}>
                  <S.HeaderInfoText
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  >
                    Email :
                    <Text style={{ color: "#36454F", fontSize: 17 }}>
                      {user.email}
                    </Text>
                  </S.HeaderInfoText>
                </Box>
                <Box bottom={10} right={2} marginRight={-50}>
                  <S.HeaderInfoText
                    style={{ fontSize: 17, fontWeight: "bold" }}
                  >
                    Location :
                    <Text style={{ color: "#36454F", fontSize: 17 }}>
                      {user.location}
                    </Text>
                  </S.HeaderInfoText>
                </Box>
              </Center>
            </S.FlyInfoTwo>

            <S.FlyInfoThree entering={FlipInXDown.duration(900).delay(1500)}>
              <Center marginRight={-50}>
                <S.HeaderInfoText
                  style={{
                    color: "black",
                    fontSize: 30,
                    fontWeight: "bold",
                    marginBottom: 30,
                  }}
                >
                  Contact List
                </S.HeaderInfoText>
                <Center>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {contactList.map((e) => (
                      <TouchableOpacity
                        onPress={() => {
                          setOneUser(e);
                          navigation.navigate("otherprofile");
                        }}
                      >
                        <Box style={styles.mediaImageContainer}>
                          <Image
                            source={{
                              uri: e.image,
                            }}
                            style={styles.image}
                            alt="*"
                            resizeMode="cover"
                          />
                        </Box>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Center>
              </Center>
            </S.FlyInfoThree>
          </ScrollView>
        </S.FlyInfoContent>
      </S.FlyInfo>
      <Footer navigation={navigation} />
    </S.Container>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "black",
    marginRight: -50,
  },
  mediaImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: "hidden",
    marginHorizontal: 15,
    zIndex: 10000,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
