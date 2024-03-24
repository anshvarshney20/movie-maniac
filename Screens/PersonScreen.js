import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "./MovieList";
import { fallBackPerson, fetchPersonDetail, fetchPersonMovie, image342, image500 } from "../httpServices/apiServices";
import Loader from "./Loader/Loader";
import SkeletonLoader from "./Loader/SkeletonLoader";

var { width, height } = Dimensions.get("window");
export default function PersonScreen() {
  const { params: item } = useRoute();
  const [favourite, setFavourite] = useState(false);
  const [personMovie, setPersonMovie] = useState([]);
  const [personDetails, setpersonDetails] = useState([])
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getPerson(item.id);
    getPersonMovies(item.id)
  }, [item]);

  const getPerson = async (id) => {
    const data = await fetchPersonDetail(id);
    setPersonMovie(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovie(id);
    if(data && data.cast){
      setpersonDetails(data.cast)
    }
    setLoading(false);
  };


  return (
    <View className="flex-1">
    <ScrollView className="flex-1 bg-neutral-900">
        {loading ? (
          <SkeletonLoader />
        ) : (
      <View className="w-full">
        <SafeAreaView className={"z-20 w-full flex-row items-center px-4 " + "my-3"}>
          <StatusBar style="light" />
          <View className="flex-row justify-between items-center mx-4 mt-8">
            <TouchableOpacity className="bg-yellow-500 rounded-xl" onPress={() => navigation.goBack()}>
              <ChevronLeftIcon color="white" strokeWidth={2.5} size={35} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFavourite(!favourite)}>
              {/* <HeartIcon size={35} color={favourite ? "red" : "white"} /> */}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      
          <View>
            <View className="flex-row justify-center" style={{ shadowColor: "gray", shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 }}>
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-900">
                <Image source={{ uri: image500(personMovie?.profile_path) || fallBackPerson }} style={{ height: height * 0.43, width: width * 0.74 }} />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">{personMovie?.name}</Text>
              <Text className="text-base text-neutral-500 font-bold text-center">{personMovie?.place_of_birth}</Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">{personMovie?.gender === 1 ? 'Female' : 'Male'}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{personMovie.birthday || "NA"}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-sm">{personMovie?.known_for_department || "NA"}</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{personMovie?.popularity?.toFixed(2) || "NA"} %</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                {personMovie?.biography || 'NA'}
              </Text>
            </View>
          </View>
        <MovieList title='Actor Movies' hideSeeAll={true} data={personDetails}/>
      </View>
      )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
