import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovie from "./TrendingMovie";
import MovieList from "./MovieList";
import Loader from "./Loader/Loader";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchtopRatedMovies,
  fetchLatestMovie,
  trendingCharacters
} from "../httpServices/apiServices";
import TopRated from "./TopRated";
import { useNavigation } from "@react-navigation/native";
import TrendingScreen from "./TrendingScreen";
// import LatestMovie from "./LatestMovie";
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [rated, setTopRated] = useState([]);
  const [latest,setLatest]  = useState([])
const [characters,setCharacters] = useState([])
  const [loading, setLoading] = useState(true);
const navigation = useNavigation()
  const fetchTrending = async () => {
    const response = await fetchTrendingMovies();
    if (response && response.results) setTrending(response.results);
    setLoading(false);
  };

  const fetchUpcoming = async () => {
    const response = await fetchUpcomingMovies();
    if (response && response.results) setUpcoming(response.results);

    setLoading(false);
  };

  const fetchTopRated = async () => {
    const response = await fetchtopRatedMovies();
    if (response && response.results) setTopRated(response.results);
    setLoading(false);
  };

  // const fetchLatestsMovie = async ()=>{
  //   const response = await fetchLatestMovie()
  //   console.log(response)
  //   if (response && response.results) setLatest(response.results);
  //   setLoading(false);
  // }
const fetchTrendingCharacters = async ()=>{
  const response = await trendingCharacters();
  if(response && response.results) {
setCharacters(response.results)
setLoading(false)
  }
}
  useEffect(() => {
    fetchTrending();
    fetchUpcoming();
    fetchTopRated();
    fetchTrendingCharacters()
    // fetchLatestsMovie()

  }, []);

  return (
    <View style={styles.container} className="bg-neutral-900">
      <SafeAreaView className="mt-7">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <TouchableOpacity>
          <Bars3CenterLeftIcon color="white" fill="black" size={42} />
          </TouchableOpacity>
          <Text style={styles.title} className="text-white text-3xl font-bold">
            <Text className="text-red-500">M</Text>ovie <Text className="text-red-500">M</Text>aniac
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <TrendingMovie data={trending} title="Trending Movies" />
          <TrendingScreen title="Trending Characters" setLoading={setLoading} data={characters} />
          {/* <LatestMovie title="Latest Movies" data={latest} /> */}
          <MovieList title="Upcoming Movies" setLoading={setLoading} data={upcoming} />
          <TopRated title="Top Rated Movies" data={rated} />

        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
