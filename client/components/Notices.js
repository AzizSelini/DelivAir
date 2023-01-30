import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Center, Image, Container, Box, Button } from "native-base";

const images = [
  [
    "Welcome to Delivair",
    `We are a contact intermediary between people.`,
    "https://i.ibb.co/yP4S0G5/System-Error-Illustration-Instagram-posts-7.png",
  ],
  [
    "Easily contact people",
    "We provide a stable messenging flow.",
    "https://i.ibb.co/QrBCV4P/System-Error-Illustration-Instagram-posts-9.png",
  ],
  [
    "Priority to security",
    "Everything you type is secure champ! don't worry.",
    "https://i.ibb.co/n8D8nRB/System-Error-Illustration-Instagram-posts-10.png",
  ],
  [
    "Find what you need",
    "There is always someone that can fulfill your needs.",
    "https://i.ibb.co/MncQBTh/System-Error-Illustration-Instagram-posts-11.png",
  ],
  [
    "One last step!",
    "",
    "https://i.ibb.co/k4kw6zN/System-Error-Illustration-Instagram-posts-12.png",
  ],
];

const Notices = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443612/Sans_titre_4_tv1aq8.gif",
        }}
        alt="*"
      />

      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View>
                <View
                  style={{ width: windowWidth, height: 150 }}
                  key={imageIndex}
                >
                  <ImageBackground
                    source={{ uri: image[2] }}
                    style={styles.card}
                  ></ImageBackground>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.infoText}>{image[0]}</Text>
                  <Box style={styles.petitText}>
                    {imageIndex === 4 ? (
                      <Button
                        variant="subtle"
                        style={styles.Begin}
                        onPress={() => navigation.navigate("form")}
                      >
                        Edit profile
                      </Button>
                    ) : (
                      <Text style={{ color: "white", fontSize: 17 }}>
                        {image[1]}
                      </Text>
                    )}
                  </Box>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {images.map((image, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <View>
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width }]}
                />
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 2,
    resizeMode: "cover",
    position: "absolute",
    width: "120%",
    height: "120%",
    justifyContent: "center",
  },
  petitText: {
    justifyContent: "center",
    position: "center",
    height: "50%",
  },
  scrollContainer: {
    height: 570,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 16,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 360,
  },
  textContainer: {
    paddingVertical: 200,
    marginTop: 50,
    position: "center",
    alignItems: "center",
  },
  infoText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "pink",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Begin: {
    borderRadius: 5,
  },
});

export default Notices;
