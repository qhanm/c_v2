import React, { Component } from 'react';

import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
//import { Icon } from 'react-native-elements';

import IconDelete from '../icons/IconDelete'
import IconNext from '../icons/IconNext';
import Color from '../constants/Color';
import { deleteClient } from '../databases/Schema';
import { SessionContext } from '../contexts/SessionContext';

export default class Client extends React.Component 
{
    constructor(props){
        super(props);
        this.__onPressFunc = this.__onPressFunc.bind(this);
    }

    deleteClient = (id, date) => {
        deleteClient(id, date).then((model) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    __onPressFunc = (sessionClient) => {
        sessionClient.setTextHeader('NHÓM: ' + this.props.client.name);
        sessionClient.setClientId(this.props.client.id);
        this.props.navigation.navigate('CustomersScreen');
    }

    render(){
        return(
            <SessionContext.Consumer>
                {
                    sessionClient =>
                    <View style={styles.container}>
                        <View style={styles.card}>
                            <TouchableOpacity 
                                style={[styles.centerBox, styles.button]}
                                onPress={() => Alert.alert(
                                    'Thông báo',
                                    'Bạn có chắc muốn xóa?',
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => this.deleteClient(this.props.client.id, this.props.date) }
                                    ]
                                )}    
                            >
                            <IconDelete qhColor={Color.White} qhSize={12} style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contentRight}
                                onPress={() => this.__onPressFunc(sessionClient)}
                            >
                                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>{this.props.client.name}</Text>
                                <View style={{justifyContent: 'center'}}>
                                    <IconNext  qhColor={Color.Red} qhSize={12} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </SessionContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    card: {
        flexDirection: 'row',
        width: '85%',
        marginTop: 4,
        marginBottom: 4,
        borderRadius: 2,
        borderColor: Color.Black,
        borderWidth: 1,
        backgroundColor: Color.White,
        //paddingBottom: 3,
        //paddingTop: 3,
    },
    centerBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        paddingLeft: 10,
        marginLeft: 30,
    },
    button: {
        backgroundColor: Color.Red,
        padding: 7,
        borderRadius: 1,
        //paddingBottom: 3,
        //paddingBottom: 3,
    },
    contentRight: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});