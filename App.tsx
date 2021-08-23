import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { JSXElement } from './src/interfaces/appInterface';
import { GradientProvider } from './src/screen/context/GradientContext';

const AppState = ({children} : JSXElement) => {
	return (
		<GradientProvider>
			{children}
		</GradientProvider>
	)
}

export const App = () => {

	return (
		<NavigationContainer>
			<AppState>
				<Navigation />
			</AppState>			
		</NavigationContainer>
	)
}
