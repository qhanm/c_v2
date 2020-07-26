

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
import ClientModel from './models/ClientModel';

class App extends Component
{

	create = model => {
		Database.ClientGroup.Insert(model).then((model) => {
			console.log(model);
		}).catch((error) => {
			console.log(error);
		})
	}

	loadAllClient = () => {
		ClientModel.All().then((model) => {
			console.log(model);
			model.forEach(element => {
				console.log(element.clients);
			});
		}).catch((error) => {
			console.log(error);
		})
	}



	componentDidMount(){
		//ClientModel.Insert({id: (new Date()).getTime(), name: 'Quach Hoai Nam'});
		//this.loadAllClient();
		// Database.Client.All().then((models) => {
		// 	console.log(models);
		// })

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
