import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import CustomerDetail from '../components/CustomerDetail';
import { SessionContext } from "../contexts/SessionContext";

export default function CustomerDetailScreen({route, navigation}){

    const { customerId } = React.useContext(SessionContext);
    return (
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={false} navigation={navigation}/>
            <CustomerDetail navigation={navigation} customerId={customerId}/>
        </View>
    )
}