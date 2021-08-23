import React from 'react'
import { FlatList, Text, View } from 'react-native'

import { Movie } from '../interfaces/movieInterface'
import { MoviePoster } from './MoviePoster'

interface Props {
    title?: string,
    movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {

    return (
        <View 
            style={{height: (title) ? 260 : 220 }}
        >
            {title && <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{title}</Text> }            
            <View>
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MoviePoster movie={item} width={120} height={200} />}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}                    
                />
            </View>
        </View>
    )
}
