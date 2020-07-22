import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import ClientGroup from '../components/ClientGroup';

export default function HomeScreen({navigation}){
    return (
        <View>
            <HeaderCustom title="NHÓM BẢNG TÍNH" isBack={false} isAdd={true} navigation={navigation} moveScreen='AddClientGroupScreen'/>
            <ClientGroup navigation={navigation}/>
        </View>
    )
}