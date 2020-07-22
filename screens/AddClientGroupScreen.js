import React from 'react';
import HeaderCustom from '../components/HeaderCustom';
import {View, Text } from 'react-native';
import AddClientGroup from '../components/AddClientGroup';

export default function AddClientGroupScreen({navigation}){
    return (
        <View>
            <HeaderCustom title="Add Client Group" isBack={true} navigation={navigation} isAdd={false}/>
            <AddClientGroup />
        </View>
    )
}