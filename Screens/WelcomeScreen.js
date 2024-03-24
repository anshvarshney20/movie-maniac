import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native"; // Import ImageBackground
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require("../assets/background_image.jpg")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Your content here */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align items to the bottom
    alignItems: "center",
    marginBottom: 36, // Adjust bottom margin as needed
  },
  content: {
    // If you have content above the button, style it here
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or "stretch"
    justifyContent: "center",
    backgroundColor: "black", // fallback color if the image is not available
  },
  button: {
    backgroundColor: "#00BFFF",
    paddingHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10, // Add some space between the button and the bottom of the screen
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
