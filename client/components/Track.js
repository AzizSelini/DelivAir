import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import StepIndicator from "react-native-step-indicator";

const { width, height } = Dimensions.get("window");
const labels = [
  "Cart",
  "Delivery Address",
  "Order Summary",
  "Payment Method",
  "Track",
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#FFC8CE",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#5FC8C0",
  stepStrokeUnFinishedColor: "#FFC8CE",
  separatorFinishedColor: "#5FC8C0",
  separatorUnFinishedColor: "#FFC8CE",
  stepIndicatorFinishedColor: "#5FC8C0",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#5FC8C0",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#5FC8C0",
  labelColor: "#5FC8C0",
  labelSize: 13,
  currentStepLabelColor: "#5FC8C0",
};
import Footer from "./Footer";
export default function Track({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(0);
  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
  };
  const data = [
    {
      label: "Ordred And Approved",
      status: "Your order has been placed",
      dateTime: "Sat , 3rd Nov 11:49 pm",
    },
    {
      label: "Packed",
      status: "Your order has been placed",
      dateTime: "Sat , 3rd Nov 11:49 pm",
    },
    {
      label: "Shipped",
      status: "Your item has been shipped ",
      dateTime: "Fri ,5rd Dec 12:25 pm",
    },
    {
      label: "Out for Deliveery",
      status: "Your item is out for delivery",
      dateTime: "Fri ,5rd Dec 12:20 pm",
    },
    {
      label: "Delivered",
      status: "Your item has been delivered",
      dateTime: "Fri ,5rd Dec 12:20 pm",
    },
  ];
  console.disableYellowBox = true;

  return (
    <View>
      <View top={25} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>DelivAir Summary</Text>
        </View>
        <View style={styles.indicatorContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            direction="vertical"
            renderLabel={({ position, stepStatus, label, crntPosition }) => {
              return (
                <View style={styles.lblContainer}>
                  <Text style={styles.lblText}>{data[position].label}</Text>
                  <Text style={styles.status}>{data[position].status}</Text>
                  <Text style={styles.status}>{data[position].dateTime}</Text>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
            <Text style={styles.text}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    top: -13,
    flex: 1,
    backgroundColor: "#FFC8CE",
  },
  header: {
    backgroundColor: "#FFC8CE",
    height: 90,
    top: 14,

    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    right: 80,
    top: 12,
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  indicatorContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    height: height - 170,
    width: width - 30,
    padding: 20,
    paddingTop: 0,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  lblContainer: {
    marginTop: 20,
    padding: 10,
    paddingLeft: 5,
    width: width - 100,
  },
  lblText: {
    fontSize: 17,
    color: "#5FC8C0",
    fontWeight: "bold",
  },
  status: {
    fontSize: 15,
    color: "grey",
  },
  nextBtn: {
    alignSelf: "flex-end",
  },
  text: {
    color: "#5FC8C0",
    fontSize: 18,
  },
});
