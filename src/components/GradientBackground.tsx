import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useFade } from '../hooks/useFade'
import { JSXElement } from '../interfaces/appInterface'
import { GradientContext } from '../screen/context/GradientContext'

export const GradientBackground = ({ children }: JSXElement) => {

    const { colors, prevColors, setPrevMainColors } = useContext(GradientContext)

    const { opacity, fadeIn, fadeOut } = useFade()

    useEffect(() => {
        fadeIn(() => {
            setPrevMainColors(colors);
            fadeOut(0)
        })
    }, [colors])

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={[prevColors.primary, prevColors.secondary, 'white']}
                style={{ ...StyleSheet.absoluteFillObject }}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.5, y: 0.7 }}
            />

            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    opacity
                }}
            >
                <LinearGradient
                    colors={[colors.primary, colors.secondary, 'white']}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 0.5, y: 0.7 }}
                />
            </Animated.View>
            {children}

        </View>
    )
}
