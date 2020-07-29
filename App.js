

import React, { Component } from 'react';
import MainNavigator from './navigators/MainNavigator';
import {SessionProvider} from './contexts/SessionContext';
// https://codesandbox.io/s/x29r438p3o?file=/src/components/NumberProvider.js
class App extends Component
{
	render(){
		return (
			<SessionProvider>
				<MainNavigator />
			</SessionProvider>
		)
	}
}

export default App;
