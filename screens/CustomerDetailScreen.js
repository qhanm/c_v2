import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import CustomerDetail from '../components/CustomerDetail';
export default function CustomerDetailScreen({route, navigation}){

    return (
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={false} navigation={navigation}/>
            <CustomerDetail navigation={navigation}/>
        </View>
    )
}