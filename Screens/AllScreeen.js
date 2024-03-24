import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { fallBackPoster, image185 } from "../httpServices/apiServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

var { width, height } = Dimensions.get("window");

export default function AllScreen({ route }) {
  const { title,data } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} className="bg-neutral-900">
      <View className="w-full">
        <SafeAreaView>
          <StatusBar style="light" />
          <View className="flex-row justify-between items-center mx-4 mt-5 text-center">
            <TouchableOpacity
              className="bg-red-500 rounded-xl"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon color="white" strokeWidth={2.5} size={35} />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold text">
              {title}
            </Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-10"
        style={styles.scroll}
      >
        <View className="flex-row justify-between flex-wrap">
          {data && data.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mb-4">
                <Image
                  source={{ uri: image185(item.poster_path) || fallBackPoster }}
                  style={{ width: width * 0.4, height: height * 0.3, borderRadius: 20 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.original_title && item.original_title.length > 14
                    ? item.original_title.slice(0, 14) + "..."
                    : item.original_title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(51, 51, 51)", // Assuming bg-neutral-800 is equivalent to rgb(51, 51, 51)
    padding: 12,
  },
  scroll:{
    marginTop:20
  }
});
