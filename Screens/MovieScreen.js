import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CastScreen from "./CastScreen";
import MovieList from "./MovieList";
import {
  fallBackPoster,
  fetchLatestMovie,
  fetchMovieCredit,
  fetchMovieDetail,
  fetchSimilarMovie,
  image500,
} from "../httpServices/apiServices";
import Loader from "./Loader/Loader";
var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [loading,setLoading] = useState(true);
  const [isfavourite, setFavourite] = useState(false);
  const [detail, setDetail] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true)
    getMovieDetails(item.id);
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item]);

  useEffect(() => {
    getGenre();
  }, []);

  const getGenre = () => {
    if (detail && detail.genres) {
      const genreNames = detail.genres.map((genre) => genre.name);
      return genreNames;
    }
    return [];
  };
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetail(id);
    setDetail(data);
    setLoading(false)
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredit(id);
    setCast(data.cast);
    // console.log(data)
    setLoading(false)
  };

  const getSimilarMovies = async (id)=>{
    const data = await fetchSimilarMovie(id)
    if(data && data.results){
      setSimilar(data.results)
    }
    // console.log(data)
  }
  return (
    loading ? (
      <Loader />
    ) : (
      <ScrollView style={styles.container} className="bg-neutral-900">
        <View className="w-full">
        <SafeAreaView >
          <StatusBar style="light" />
          <View className="flex-row justify-between items-center mx-4 mt-8">
            <TouchableOpacity
              className="bg-yellow-500 rounded-xl"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon color="white" strokeWidth={2.5} size={35} />
            </TouchableOpacity>
            <TouchableOpacity >
              {/* <HeartIcon size={35} color="white" /> */}
            </TouchableOpacity>
          </View>
     
          <View>
            {/* Movie Poster */}
            <Image
              source={{ uri: image500(detail?.poster_path) || fallBackPoster}}
              style={{ width, height: height * 0.55 }}
            />
            {/* Gradient Overlay */}
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
          </SafeAreaView>
          <View style={{ marginBottom: 10 }} className="space-y-3">
            {/* Movie Title */}
            <Text className="text-neutral-400 text-center text-3xl font-bold  tracking-wider">
              {detail?.title}
            </Text>
            {/* Tagline */}
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {detail?.tagline}
            </Text>
            {/* Status, Release Date, Runtime */}
            {detail?.status && (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {detail.status} * {detail.release_date?.split("_")[0]} *{" "}
                {detail.runtime} mins
              </Text>
            )}
            {/* Genres */}
            <View className="flex-row justify-center mx-4 space-x-2">
              {getGenre().map((genre, index) => (
                <React.Fragment key={index}>
                  <Text className="text-neutral-400 font-semibold text-base text-center">
                    {genre}
                  </Text>
                  {index !== getGenre().length - 1 && (
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                      {" "}
                      *{" "}
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </View>
            {/* Overview */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {detail?.overview}
            </Text>
          </View>
          {/* Cast Screen */}
          <CastScreen cast={cast} navigation={navigation} />
          {/* Similar Movies */}
          <MovieList title="Similar Movies" hideSeeAll={true} data={similar} />
        </View>
      </ScrollView>
    )
  );
                  }  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
});
