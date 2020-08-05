import React from 'react';
import {View, Text} from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import Calculator from '../components/Calculator';

export default function CalculatorScreen({navigation}){
    return(
        <View>
            <HeaderCustom title="NHÓM: A" isBack={true} isAdd={false} navigation={navigation}/>
            <Calculator />
        </View>
    )
}