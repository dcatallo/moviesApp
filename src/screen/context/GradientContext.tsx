import { useState } from "react";
import React, { createContext } from "react";
import { JSXElement } from "../../interfaces/appInterface";

interface ImageColors {
    primary: string,
    secondary: string
}

interface ContextProps {
    colors: ImageColors,
    prevColors: ImageColors,
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps );

export const GradientProvider = ({children} : JSXElement ) => {
    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const [prevColors, setPrevColors] = useState<ImageColors>({
        primary: 'transparent',
        secondary: 'transparent'
    });

    const setMainColors = (colors: ImageColors) => {
        setColors(colors)
    }

    const setPrevMainColors = (colors: ImageColors) => {
        setPrevColors(colors)
    }

    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setMainColors,
                setPrevMainColors
            }}
        >
            {children}
        </GradientContext.Provider>
    )
}