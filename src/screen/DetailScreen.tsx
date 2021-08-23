import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { MovieDetails } from '../components/MovieDetails';

import { UseMovieDetails } from '../hooks/useMovieDetails';
import { RootStackParams } from '../navigation/Navigation'

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {

    const movie = route.params
    const uri = `https://image.tmdb.org/t/p/original${movie.poster_path}`

    const { isLoading, movieFull, cast } = UseMovieDetails(movie.id)

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                {/* Boton para cerrar */}
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.pop()}
                >
                    <Icon
                        name="arrow-back-outline"
                        size={30}
                        color="grey"
                    />
                </TouchableOpacity>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.images}
                    />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {
                isLoading ?
                    <ActivityIndicator size={35} color="grey" style={{ marginTop: 15 }} />
                    :
                    <MovieDetails movieFull={movieFull!} cast={cast} />
            }



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: screenHeight * 0.7,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,
        elevation: 10,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    images: {
        flex: 1
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    }
})