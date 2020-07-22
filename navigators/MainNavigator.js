import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import Color from '../constants/Color';
import Icon from '../icons/Icon';
import HomeStack from '../stacks/HomeStack';

const Tab = createBottomTabNavigator();

function MainNavigator(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: Color.Red,
                    inactiveTintColor: Color.Silver,
                }}
            >
                <Tab.Screen name="HomeStack" component={HomeStack} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                           <Icon.Home qhColor={color} qhSize={26} />
                        ),
                    }}
                />
                <Tab.Screen  name="SettingScreen" component={SettingScreen} 
                    options={{
                        tabBarLabel: 'Setting',
                        tabBarIcon: ({ color }) => (
                            <Icon.Setting qhColor={color} qhSize={26} />   
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;