import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Rating({ starRating }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.stars}>
          <MaterialIcons
            name={starRating >= 1 ? "star" : "star-border"}
            size={32}
            style={
              starRating >= 1 ? styles.starSelected : styles.starUnselected
            }
          />

          <MaterialIcons
            name={starRating >= 2 ? "star" : "star-border"}
            size={32}
            style={
              starRating >= 2 ? styles.starSelected : styles.starUnselected
            }
          />

          <MaterialIcons
            name={starRating >= 3 ? "star" : "star-border"}
            size={32}
            style={
              starRating >= 3 ? styles.starSelected : styles.starUnselected
            }
          />

          <MaterialIcons
            name={starRating >= 4 ? "star" : "star-border"}
            size={32}
            style={
              starRating >= 4 ? styles.starSelected : styles.starUnselected
            }
          />

          <MaterialIcons
            name={starRating >= 5 ? "star" : "star-border"}
            size={32}
            style={
              starRating >= 5 ? styles.starSelected : styles.starUnselected
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    left: 25,
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starUnselected: {
    color: "grey",
  },
  starSelected: {
    color: "#ffd700",
  },
});
