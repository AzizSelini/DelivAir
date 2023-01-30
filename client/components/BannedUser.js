import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, Box, Image } from "native-base";
export default function Banned() {
  const handleEmailPress = () => {
    const to = "delivaireclamtion@gmail.com";
    const subject = "Reclamation";
    const body = "";
    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`);
  };
  return (
    <Box style={styles.image} backgroundColor={"#FFC8CE"}>
      <Image
        style={styles.logo}
        marginLeft={16}
        top={100}
        source={{
          uri: "https://i.ibb.co/c8kK9nZ/System-Error-Illustration-Instagram-posts-15.png",
        }}
        alt="Alternate Text"
        size="xl"
      />

      <Box>
        <Text style={styles.textrec}>
          You have been banned from our service, you can send us an email if
          there is any misunderstanding and please make sure to explain the main
          problem.{" "}
        </Text>
        <Text style={styles.textrec} bold>
          Thank you
        </Text>
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.textlink}>E-mail us here</Text>
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
