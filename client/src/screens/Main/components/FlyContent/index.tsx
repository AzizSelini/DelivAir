import React, { useEffect } from "react";
import { StatusBar, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";

import * as S from "./styles";
import {
  Text,
  Box,
  Container,
  HStack,
  Divider,
  Center,
  Avatar,
  Heading,
  VStack,
  useToast,
} from "native-base";

import Swiper from "react-native-swiper";

export default function FlyContent({ navigation, posts, to, from, setPosts }) {
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
  const search = (from, to) => {
    let searchedData = posts.filter(
      (e): any =>
        e.departCountry.toLowerCase().includes(from.toLowerCase()) &&
        e.arriveCountry.toLowerCase().includes(to.toLowerCase())
    );
    setPosts(searchedData);
    console.log(searchedData, "search");

    console.log(posts, "ppppppppppppp");
  };
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
    search(from, to);
  }, []);
  useEffect(() => {
    if (posts.length == 0) {
      // Ale('error')
    }
  }, [posts]);
  return (
    <S.Container>
      <StatusBar barStyle="light-content" />
      <S.Header style={headerAnimatedStyled}></S.Header>
      <S.HeaderContent style={headerContentAnimatedStyled}>
        <S.HeaderText bold>Your destination has been submitted</S.HeaderText>
        <S.HeaderText>We are waiting for your delivair</S.HeaderText>
      </S.HeaderContent>
      <S.FlyInfo entering={FlipInXDown.duration(900).delay(100)}>
        <S.FlyInfoContent intensity={70}>
          <S.TextRowContent>
            <S.TextContent>
              <S.LargeText>{from}</S.LargeText>
            </S.TextContent>
            <S.HourContent>
              <Entypo name="chevron-right" size={30} color="white" />
            </S.HourContent>
            <S.TextContent alingment="right">
              <S.LargeText>{to}</S.LargeText>
            </S.TextContent>
          </S.TextRowContent>
          <S.TicketInfo></S.TicketInfo>
          <Box style={{ zIndex: 10002, height: 200, width: 300 }}>
            <Swiper showsPagination={false}>
              {posts.map((e, i) => (
                <Box width={300} style={style.graybox}>
                  <Container margin={3}>
                    <HStack space={2}>
                      <VStack>
                        <Center style={style.left}>
                          <Avatar
                            source={{
                              uri: e.poster_image,
                            }}
                          />
                        </Center>
                        <Center backgroundColor="#EBC8CB" borderRadius="5">
                          <Text>{e.weight}kg</Text>
                        </Center>
                      </VStack>
                      <Center></Center>
                      <VStack>
                        <Container style={style.Middle}>
                          <Heading size="sm">{e.content}</Heading>
                          <Text color={"grey"}>{relativeDate(e.postTime)}</Text>
                          <Text>{e.departCountry}</Text>
                        </Container>
                        <Container marginTop="3" fontWeight="400">
                          <Text>Departure Time:</Text>
                          <Text>{convertTime(e.departTime)}</Text>
                        </Container>
                      </VStack>
                    </HStack>
                  </Container>
                </Box>
              ))}
            </Swiper>
          </Box>
        </S.FlyInfoContent>
      </S.FlyInfo>
    </S.Container>
  );
}

const style = StyleSheet.create({
  Header: {
    backgroundColor: "#EBC8CB",
    paddingTop: 30,
  },
  search: {
    width: 100,
    height: 30,
  },
  graybox: {
    color: "black",
    backgroundColor: "#e7f5e5",
    borderRadius: 10,
  },
  searchButtons: {
    color: "black",
    backgroundColor: "#D9D9D9",
    margin: 3,
  },
  Middle: {
    width: 220,
  },
  left: {
    width: 50,
    margin: 10,
  },
});
