import {
  Text,
  VStack,
  Box,
  Input,
  Center,
  HStack,
  Button,
  Container,
  Heading,
  ScrollView,
  Modal,
  Image,
  AspectRatio,
  Stack,
} from "native-base";

import DropDownPicker from "react-native-dropdown-picker";
import { ImageBackground, StyleSheet } from "react-native";

import React, { useState, useEffect } from "react";

import DatePicker from "react-native-modern-datepicker";

const date = new Date();
const imaage = {
  uri: "https://i.ibb.co/S6BX4nQ/eberhard-grossgasteiger-j-CL98-LGaeo-E-unsplash.jpg",
};

export default function Home({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  //----role
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [role, setRole] = useState([
    { label: "Sender", value: "sender" },
    { label: "Shipper", value: "shipper" },
  ]);
  //----Weight
  const [openWeight, setOpenWeight] = useState(false);
  const [valueWeight, setValueWeight] = useState(null);
  const [weight, setWeight] = useState([
    { label: "1-5 kg", value: "1-5kg" },
    { label: "5-10kg", value: "5-10kg" },
  ]);
  //----Country
  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState(null);
  const [country, setCountry] = useState([
    { label: "Tunisia", value: "tunisia" },
    { label: "France", value: "france" },
    { label: "Germany", value: "germmany" },
  ]);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />

          <DatePicker
            onSelectedChange={(date) =>
              setSelectedDate(date.slice(0, date.length - 6))
            }
          />
        </Modal.Content>
      </Modal>
      <ScrollView>
        <ImageBackground source={imaage} borderRadius={10}>
          <Box>
            <Box style={style.Header}>
              <VStack>
                <Heading style={style.logo}>DeliVair</Heading>
              </VStack>
            </Box>
          </Box>
        </ImageBackground>
        <Box style={style.inputBox}>
          <HStack>
            <Container>
              <DropDownPicker
                style={style.role}
                translation={{
                  PLACEHOLDER: "role",
                }}
                open={open}
                value={value}
                items={role}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setRole}
              />
            </Container>
            <Container>
              <DropDownPicker
                style={style.role}
                translation={{
                  PLACEHOLDER: "Weight",
                }}
                open={openWeight}
                value={valueWeight}
                items={weight}
                setOpen={setOpenWeight}
                setValue={setValueWeight}
                setItems={setWeight}
              />
            </Container>

            <Container>
              <DropDownPicker
                style={style.role}
                translation={{
                  PLACEHOLDER: "Country",
                }}
                open={openCountry}
                value={valueCountry}
                items={country}
                setOpen={setOpenCountry}
                setValue={setValueCountry}
                setItems={setCountry}
              />
            </Container>
            <Container>
              <Button
                style={style.date}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text color={"black"}> Date</Text>
              </Button>
              <Box style={style.inputdate}>
                <VStack space="4" justifyContent="center" alignItems="center">
                  <Text
                    style={{
                      borderRadius: 5,
                      borderColor: "d6d6d6",
                      borderWidth: 1,
                      height: 30,
                      width: 150,
                      left: 13,
                    }}
                  >
                    {selectedDate}
                  </Text>
                </VStack>
              </Box>
            </Container>
            <Container>
              <Button style={style.from}>
                <Text color={"black"}>From</Text>
              </Button>
              <Box style={style.inputfrom}>
                <Input mx="3" placeholder="from" w="100%" />
              </Box>
            </Container>
            <Container>
              <Button style={style.to}>
                <Text color={"black"}>To</Text>
              </Button>
              <Box style={style.inputto}>
                <Input placeholder="to"></Input>
              </Box>
            </Container>
            <Container>
              <Button style={style.submit}>Submit</Button>
            </Container>
          </HStack>
        </Box>

        <Box>
          <Container>
            <Box style={style.secondinputBox}>
              <Center>
                <Text style={{ marginTop: 20, fontWeight: "bold" }}>
                  Important product notes
                </Text>
              </Center>

              <VStack space={4} alignItems="center" marginTop={30}>
                <Center w="64" h="20" bg="#F9F8F8" rounded="md" shadow={3}>
                  <HStack>
                    <Container>
                      <Image
                        margin={30}
                        size={10}
                        source={{
                          uri: "https://i.ibb.co/tsYxww6/gift.png",
                        }}
                        alt="Alternate Text"
                      />
                    </Container>
                    <Container>
                      <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 20,
                        }}
                      >
                        Products should be verified by the shipper.
                      </Text>
                    </Container>
                  </HStack>
                </Center>

                <Center w="64" h="20" bg="#F9F8F8" rounded="md" shadow={3}>
                  <HStack>
                    <Container>
                      <Image
                        margin={30}
                        size={10}
                        source={{
                          uri: "https://i.ibb.co/7bQDSNV/luggage.png",
                        }}
                        alt="Alternate Text"
                      />
                    </Container>
                    <Container>
                      <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 20,
                        }}
                      >
                        Luggage weight should be discussed with both parties.
                      </Text>
                    </Container>
                  </HStack>
                </Center>

                <Center w="64" h="20" bg="#F9F8F8" rounded="md" shadow={3}>
                  <HStack>
                    <Container>
                      <Image
                        margin={30}
                        size={10}
                        source={{
                          uri: "https://i.ibb.co/3YWqjZt/money.png",
                        }}
                        alt="Alternate Text"
                      />
                    </Container>
                    <Container>
                      <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 20,
                        }}
                      >
                        Price is fixed by our own policy.
                      </Text>
                    </Container>
                  </HStack>
                </Center>

                <Center w="64" h="20" bg="#F9F8F8" rounded="md" shadow={3}>
                  <HStack>
                    <Container>
                      <Image
                        margin={30}
                        size={10}
                        source={{
                          uri: "https://i.ibb.co/1RXWmZZ/no-bottle.png",
                        }}
                        alt="Alternate Text"
                      />
                    </Container>
                    <Container>
                      <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          margin: 20,
                        }}
                      >
                        Check our policy to see the prohibited products.
                      </Text>
                    </Container>
                  </HStack>
                </Center>
              </VStack>
            </Box>
          </Container>
        </Box>

        <Box style={style.thirdBox}>
          <Box alignItems="center" marginTop={5} marginRight={5} marginLeft={5}>
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: "https://blog.aci.aero/wp-content/uploads/2019/10/shutterstock_234649834-952x630.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    Understanding prohibited items in aviation
                  </Heading>
                </Stack>
                <Text fontWeight="400">
                  When passengers reach the security screening point, security
                  staff is responsible for ensuring no one is travelling with an
                  item that is prohibited on board.
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      Read more
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>

          <Box alignItems="center" margin={5}>
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: "https://blog.aci.aero/wp-content/uploads/2019/10/shutterstock_234649834-952x630.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    Understanding prohibited items in aviation
                  </Heading>
                </Stack>
                <Text fontWeight="400">
                  When passengers reach the security screening point, security
                  staff is responsible for ensuring no one is travelling with an
                  item that is prohibited on board.
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      Read more
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Box alignItems="center" margin={50}>
          <Input
            type={"text"}
            w="100%"
            size="2xl"
            InputRightElement={
              <Button
                backgroundColor={"#E7C7C8"}
                size="2xl"
                rounded="none"
                w="1/6"
                h="full"
              >
                Send
              </Button>
            }
            placeholder="Subscribe to our Newsletter"
          />
        </Box>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  Header: {
    paddingTop: 80,
    width: 500,
    height: 379,
    left: 0,
    top: -33,
    ImageBackground:
      "https://i.ibb.co/S6BX4nQ/eberhard-grossgasteiger-j-CL98-LGaeo-E-unsplash.jpg",
  },

  graybox: {
    color: "black",
    backgroundColor: "#EAEAEA",
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
  logo: {
    width: 143,
    height: 48,
    left: 12,
    top: 10,
    fontSize: 30,
  },
  inputBox: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,

    elevation: 6,
    shadowColor: "black",
    width: 328,
    height: 466,
    left: 45,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: -230,
  },
  role: {
    marginLeft: 10,
    width: 75,
    height: 36,
    left: 35,
    top: 30,
    backgroundColor: "#E7C7C8",
    borderRadius: 14,
    fontSize: 10,
  },
  date: {
    width: 75,
    height: 36,
    left: -210,
    top: 130,
    backgroundColor: "#E7C7C8",
    borderRadius: 14,
  },
  from: {
    width: 75,
    height: 36,
    left: -360,
    top: 210,
    backgroundColor: "#E7C7C8",
    borderRadius: 14,
  },
  to: {
    width: 75,
    height: 36,
    left: -510,
    top: 290,
    backgroundColor: "#E7C7C8",
    borderRadius: 14,
  },
  inputdate: {
    width: 150,
    height: 36,
    left: -120,
    top: 95,
  },
  inputfrom: {
    width: 150,
    height: 36,
    left: -270,
    top: 175,
    bordercolor: "black",
  },
  inputto: {
    width: 150,
    height: 36,
    left: -410,
    top: 255,
  },
  submit: {
    width: 150,
    height: 36,
    left: -480,
    top: 390,
    borderRadius: 5,
    width: 90,
    backgroundColor: "#9EA7B6",
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 1,
    shadowRadius: 8,
    shadowOffset: { width: 6, height: 5 },
  },
  secondinputBox: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,

    elevation: 6,
    shadowColor: "black",
    width: 328,
    height: 466,
    left: 45,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 20,
  },
  elements: {
    margin: 40,
    backgroundColor: "#F9F8F8",
    boxShadow: 8,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 4.65,
  },
  thirdBox: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,

    elevation: 6,
    shadowColor: "black",
    width: 328,
    height: "auto",
    left: 45,
    backgroundColor: "white",
    borderRadius: 30,
    marginTop: 20,
  },
});
