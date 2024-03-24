import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { debounce } from "lodash";
import {
  fallBackPerson,
  fallBackPoster,
  image185,
  searchMovie,
} from "../httpServices/apiServices";
var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const [results, setresults] = useState([]);
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setloading(true);
      searchMovie({
        query: value,
        include_adult: "true",
        language: "en-us",
        page: "1",
      }).then((data) => {
        setloading(false);
        if (data && data.results) {
          setresults(data.results);
        }
      });
    } else {
      setloading(false);
      setresults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          style={styles.input}
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-1 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: item?.poster_path
                          ? image185(item.poster_path)
                          : fallBackPoster,
                      }}
                      style={{ width: width * 0.4, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 20
                        ? item?.title?.slice(0, 15) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/pngwing.png")}
            className="h-96 w-80"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(51, 51, 51)", // Assuming bg-neutral-800 is equivalent to rgb(51, 51, 51)
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgb(139, 139, 139)", // Assuming border-neutral-500 is equivalent to rgb(139, 139, 139)
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
