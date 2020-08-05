import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddClientGroupScreen from '../screens/AddClientGroupScreen';
import CustomersScreen from '../screens/CustomersScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import CalculatorScreen from '../screens/CalculatorScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
	return (
		<Stack.Navigator
		screenOptions={{
			headerShown: false
		}}
		>
			<Stack.Screen name="HomeScreen" component={HomeScreen} />
			<Stack.Screen name="AddClientGroupScreen" component={AddClientGroupScreen} />
			<Stack.Screen name="CustomersScreen" component={CustomersScreen} />
			<Stack.Screen name="AddCustomerScreen" component={AddCustomerScreen} />
			<Stack.Screen name="CustomerDetailScreen" component={CustomerDetailScreen} />
			<Stack.Screen name="CalculatorScreen" component={CalculatorScreen} />
		</Stack.Navigator>

	);
}