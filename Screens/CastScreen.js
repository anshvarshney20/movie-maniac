import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { fallBackPerson, image185 } from "../httpServices/apiServices";
export default function CastScreen({ cast , navigation}) {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.map((item, index) => {
          return (
            <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=>navigation.navigate('Person',item)}>
             <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
             <Image
                className="rounded-2xl h-24 w-20"
                source={{uri:image185(item?.profile_path) || fallBackPerson}}
              />
             </View>
              <Text className="text-white text-xs mt-1">
                {item?.character}
              </Text>
              <Text className="text-white text-xs mt-1">
                {item?.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
