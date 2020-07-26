import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Constant from '../constants/Constant';
import Color from '../constants/Color';

import Clients from './Clients';
import IconDate from '../icons/IconDate';

export default class ClientGroup extends React.Component{


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconDate}>
                            <IconDate qhSize={15} qhColor={Color.Blue}/>
                        </View>
                        <Text style={styles.textHeader}>{this.props.client.date}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <Clients navigation={this.props.navigation} date={this.props.client.date} clients={this.props.client.clients}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:  10,
    },
    card: {
        backgroundColor: Constant.Color.Silver,
        borderRadius: 2,
        shadowColor: Constant.Color.Black,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        shadowOpacity: 0.8,
        width: '92%',
    },
    cardHeader: {
        //marginLeft: 10,
        flexDirection: 'row',
        borderColor: Color.Red,
        borderBottomWidth: 1,
    },
    cardBody: {
        justifyContent: 'center',
    },
    textHeader: {
        marginLeft: 8,
        paddingBottom: 4,
        paddingTop: 4,
        fontWeight: 'bold',
        color: Color.Blue,
    },
    iconDate: {
        justifyContent: 'center',
        marginLeft: 30,
    }
});