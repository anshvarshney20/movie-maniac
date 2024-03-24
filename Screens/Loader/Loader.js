import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
export default function Loader() {
  return (
    <SafeAreaView style={styles.container} className="bg-neutral-900">
    <View style={styles.animationContainer}>
      <LottieView
        style={styles.animation}
        source={require("../../assets/Animation - 1710591450469.json")}
        autoPlay
        loop
      />
    </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  animationContainer: {
    width: "100%",
    height: 300, // adjust as needed
  },
  animation: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
