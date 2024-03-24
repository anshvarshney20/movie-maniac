import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../httpServices/apiServices'

var {width,height} = Dimensions.get('window')

export default function TrendingMovie({title,data}) {
    const navigation = useNavigation()
    const handleClick = (item)=>{
        navigation.navigate('Movie',item)
    }
    
  return (
    <View style={styles.container}>
      {} 
      <Text style={styles.title} className="text-white text-xl mx-4 mb-4">{title}</Text>
      <Carousel 
        data={data} 
        renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display:'flex',alignItems:'center'}}
      />
    </View>
  )
}

const MovieCard = ({item,handleClick})=>{
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image source={{uri:image500(item.poster_path)}} style={styles.image}/>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 20,
  },
});
