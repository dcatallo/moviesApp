import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interfaces/movieInterface'

interface Props {
    movie: Movie,
    width?: number,
    height?: number
}

export const MoviePoster = ({ movie, width = 300, height = 420 }: Props) => {
    const uri = `https://image.tmdb.org/t/p/original${movie.poster_path}`

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={{
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 20,
                paddingHorizontal: 7
            }}
            onPress={() => navigation.navigate('DetailScreen', movie)}
            activeOpacity={0.8 }
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.images}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    images: {
        flex: 1,
        borderRadius: 18,
    },
    imageContainer: {
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,
        elevation: 10,
        marginHorizontal: 10
    }

})