import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileImage} />
      <View style={styles.textSkeleton} />
      <View style={styles.textSkeleton} />
      <View style={styles.textSkeleton} />
      <View style={styles.textSkeleton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    borderRadius: 100,
    marginBottom: 20,
  },
  textSkeleton: {
    height: 20,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
});

export default SkeletonLoader;
