import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Client from './Client';
export default function Clients({navigation})
{
    return(
        <View>
            <Client navigation={navigation}/>
            <Client navigation={navigation}/>
            <Client navigation={navigation}/>
        </View>
    )
}