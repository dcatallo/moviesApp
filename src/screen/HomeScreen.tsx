import React from 'react'
import { ActivityIndicator, View, Dimensions, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { useContext } from 'react';
import { GradientContext } from './context/GradientContext';
import { useEffect } from 'react';


const { width : windowWidth } =  Dimensions.get('window')

export const HomeScreen = () => {    

    const { nowPlaying, populars, topRated, upComing,isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext);

    const getPosterColors = async (index : number) => {
        const movie = nowPlaying[index]
        const uri = `https://image.tmdb.org/t/p/original${movie.poster_path}`
        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri)
        
        setMainColors({primary, secondary})
    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0)
        }
    },[nowPlaying])

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator color='red' size={100} />
            </View>
        )
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{marginTop: top + 20}}>
                    <View style={{height: 440}}>
                        <Carousel 
                            data={nowPlaying}
                            renderItem={({item}) => <MoviePoster movie={item} />}
                            sliderWidth={ windowWidth }
                            itemWidth={ 300 }
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index => getPosterColors(index)}
                        />
                    </View>

                    {/*Peliculas populares*/}
                    <HorizontalSlider movies={populars} title={"Populars"} />
                    {/*mejores*/}
                    <HorizontalSlider movies={topRated} title={"Top rated"} />
                    {/*En breve*/}
                    <HorizontalSlider movies={upComing} title={"UpComing"} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}