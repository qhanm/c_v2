/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Database from './databases/Database';
import ClientGroup from './components/ClientGroup';
import { Header } from 'react-native-elements';
import MainNavigator from './navigators/MainNavigator';

class App extends Component
{

	create = model => {
		Database.ClientGroup.Insert(model).then((model) => {
			console.log(model);
		}).catch((error) => {
			console.log(error);
		})
	}

	All = () => {
		Database.ClientGroup.All().then((models) => {
			console.log('Alls data');
			console.log(models);
		}).catch((error) => {
			console.log(error);
		})
	}

	componentDidMount(){
		//this.create({id: (new Date()).getTime(), date: '01-02-2020'})
		console.log('After')
		this.All();
	}

	render(){

		console.log('Before render');

		return (
			<MainNavigator />
		
			// <SafeAreaView style={{flex: 1, marginBottom: 20}}>
			// 	<Header 
			// 		leftComponent={<Text>Left</Text>}
			// 		centerComponent={<Text>Home</Text>}
			// 		rightComponent={<Text>Left</Text>}
			// 	/>
			// 	<ScrollView style={{marginHorizontal: 5}}>
			// 		<ClientGroup />
			// 		<ClientGroup />
			// 		<ClientGroup />
			// 		<ClientGroup />
			// 		<ClientGroup />
			// 	</ScrollView>
			// </SafeAreaView>
			
		)
	}
}

export default App;
