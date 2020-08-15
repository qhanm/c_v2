import React from 'react';
import {View, Text } from 'react-native';
import HeaderCustom from '../components/HeaderCustom';
import ClientGroup from '../components/ClientGroup';
import Customers from '../components/Customers';
import { SessionContext } from '../contexts/SessionContext';
import { ScrollView } from 'react-native-gesture-handler';

export default class CustomersScreen extends React.Component{
    render(){
        return (
           <SessionContext.Consumer>
               {
                   sessionContext => 
                   <View>
                        <HeaderCustom title="NHÓM: A" isBack={true} isAdd={true} navigation={this.props.navigation} moveScreen='AddCustomerScreen'/>
                        <ScrollView style={{marginBottom: 70}}>
                            <Customers navigation={this.props.navigation} clientId={sessionContext.clientId}/>
                        </ScrollView>
                    </View>
               }
           </SessionContext.Consumer>
        )
    }
}