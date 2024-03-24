import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { fallBackPoster, image185 } from "../httpServices/apiServices";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

var { width, height } = Dimensions.get("window");

export default function TrendingScreen({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center mt-8">
        <Text className="text-white text-xl">{title} </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.push("Person", item)}
            >
              <View className="space-y-1 mr-4">
                <View className="rounded-full">
                <Image
                  source={{ uri: image185(item.profile_path) || fallBackPoster}}
                  className="rounded-full"
                  style={{ width: width * 0.25, height: height * 0.14,borderRadius:50 }}
                />
                </View>
                <Text className="text-neutral-300 text-center mt-5">
                  {item.name && item.name.length > 14
                    ? item.name.slice(0, 14) + "..."
                    : item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
