import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import ClientGroup from '../components/ClientGroup';
import Customers from '../components/Customers';

export default function CustomersScreen({navigation}){
    return (
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={true} navigation={navigation} moveScreen='AddCustomerScreen'/>
            <Customers navigation={navigation}/>
        </View>
    )
}