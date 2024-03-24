import React, { useState, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loader from '../../Screens/Loader/Loader';
import HomeScreen from '../../Screens/HomeScreen';
import WelcomeScreen from '../../Screens/WelcomeScreen';
import MovieScreen from '../../Screens/MovieScreen';
import PersonScreen from '../../Screens/PersonScreen';
import SearchScreen from '../../Screens/SearchScreen';
import AllScreeen from '../../Screens/AllScreeen';

const Stack = createNativeStackNavigator();

export default function Route() {
  const [isLoading, setIsLoading] = useState(false); // Initially, loading is false

  return (
    <NavigationContainer>
      <Suspense fallback={<Loader />}>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{ headerShown: false }}
          onStateChange={() => setIsLoading(true)} // Show loader when navigation state changes
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Person" component={PersonScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="AllScreen" component={AllScreeen} />

        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
}
