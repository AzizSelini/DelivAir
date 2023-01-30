import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Box, Image } from "native-base";

import { UserContext } from "../UserContext";
import { useContext } from "react";
export default function Unverifed({ navigation }) {
  const { setUser } = useContext(UserContext);
  const handleOK = () => {
    setUser(null);
    navigation.navigate("login");
  };

  return (
    <Box style={styles.image} backgroundColor={"#FFC8CE"}>
      <Image
        style={styles.logo}
        marginLeft={16}
        top={100}
        source={{
          uri: "https://i.ibb.co/ZSHfJdS/System-Error-Illustration-Instagram-posts-14.png",
        }}
        alt="Alternate Text"
        size="xl"
      />

      <Box>
        <Text style={styles.textrec}>
          Hello! We're happy you signed up for DelivAir and thank you for
          completing your profile form, an admin will call you shortly in order
          to verify your profile! You need to be <Text bold>verified</Text> to
          access all the features of our app.{" "}
        </Text>
        <TouchableOpacity onPress={handleOK}>
          <Text style={styles.textlink}>Agree to wait</Text>
        </TouchableOpacity>
        <Image
          style={styles.image2}
          source={{
            uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673367250/Sans_titre-2_znvrkq.gif",
          }}
        ></Image>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  textlink: {
    left: 90,
    top: 160,
    color: "white",
    fontWeight: "bold",
  },
  textrec: {
    fontWeight: "b",
    color: "white",
    width: 320,
    left: 45,
    top: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    alignSelf: "center",
    marginTop: -100,
  },
  formFieldsContainer: {
    justifyContent: "center",
    marginVertical: 250,
  },
  input: {
    left: 10,
    width: 330,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  inputreclamation: {
    left: 10,
    width: 330,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
  button: {
    margin: 10,
  },
  image: {
    height: 1000,
    width: 1920,
  },
  image2: {
    height: 60,
    width: 60,
    top: 110,
    left: 300,
  },
  logo: {
    width: 300,
    height: 300,
  },
});
