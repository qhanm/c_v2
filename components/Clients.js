import React, { Component } from 'react';
import {View, Text} from 'react-native';
import Client from './Client';
export default class Clients extends React.Component
{
    render(){
        return(
            <View>
                {
                    this.props.clients.map((client, i) => {
                        return <Client key={i} navigation={this.props.navigation} date={this.props.date} client={client}/>
                    })
                }
            </View>
        )
    }
}