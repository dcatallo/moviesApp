import currencyFormatter from 'currency-formatter'
import React from 'react'
import { Text, View, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Cast } from '../interfaces/creditsInterface'
import { MovieFull } from '../interfaces/movieInterface'
import { CastItem } from './CastItem'

interface Props {
    movieFull: MovieFull,
    cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast } : Props) => {

    return (
        <>
            {/* Detalles */}
            <View style={{marginHorizontal : 20}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="star-outline" color="grey" size={16} />
                    <Text style={{marginLeft: 5}}>{movieFull.vote_average}</Text>
                    <Text style={{marginLeft: 5}}>
                        - {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>

                {/* Historia */}
                <Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 10}}>Historia</Text>
                <Text style={{fontSize: 16}}>{movieFull.overview}</Text>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Presupuesto</Text>
                <Text style={{fontSize: 18}}>{ currencyFormatter.format(movieFull.budget, {code: 'USD'}) }</Text>
            </View>

            {/* Casting */}
            <View style={{marginTop: 10, marginBottom: 100}}>
                <Text style={{fontSize: 23, fontWeight: 'bold', marginTop: 10, marginHorizontal: 20}}>Actores</Text>
                {/*<CastItem actor={cast[0]}/>*/}
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/>}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, height: 70}}
                />
            </View>
        </>
    )
}
