import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Box, Image } from "native-base";

const ReclamationForm = () => {
  const handleEmailPress = () => {
    const to = "delivaireclamtion@gmail.com";
    const subject = "Reclamation";
    const body = "Write here the body of the email";
    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`);
  };

  return (
    <Box style={styles.image} backgroundColor={"#FFC8CE"}>
      <Image
        style={styles.logo}
        left={12}
        top={100}
        source={{
          uri: "https://res.cloudinary.com/duqxezt6m/image/upload/v1673443763/1_swzwcw.png",
        }}
        alt="Alternate Text"
        size="xl"
      />

      <Box>
        <Text style={styles.textrec}>
          When something isn't working properly, the reports we receive on
          DelivAir help us identify and fix the issues. A detailed report (e.g.
          with screenshot and description) helps us to find what is wrong. When
          you report issues as soon as they happen pressing in this link :{" "}
        </Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.textlink}>delivaireclamtion@gmail.com</Text>
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
};

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
    left: 35,
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

export default ReclamationForm;
