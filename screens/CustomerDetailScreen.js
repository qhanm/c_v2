import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import ClientGroup from '../components/ClientGroup';
import Customers from '../components/Customers';
import AddCustomer from '../components/AddCustomer';
import CustomerDetail from '../components/CustomerDetail';
export default function AddCustomerScreen({navigation}){
    return (
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={false} navigation={navigation}/>
            <CustomerDetail navigation={navigation}/>
        </View>
    )
}