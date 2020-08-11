import React from 'react';
import {View, Text} from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import Calculator from '../components/Calculator';
import {SessionContext} from '../contexts/SessionContext';

export default function CalculatorScreen({navigation}){

    const {customerId} = React.useContext(SessionContext);

    console.log(customerId);

    return(
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={false} navigation={navigation}/>
            <Calculator customerId={customerId}/>
        </View>
    )
}