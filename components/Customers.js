import React from 'react';
import {View, Text} from 'react-native';
import Customer from './Customer';

export default function Customers({navigation}){
    return (
        <View>
            <Customer navigation={navigation}/>
            <Customer navigation={navigation}/>
            <Customer navigation={navigation}/>
        </View>
    )
}