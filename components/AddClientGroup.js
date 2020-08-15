import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constant from '../constants/Constant';
import { insertClientGroup } from '../databases/Schema';

import AlertCustom from '../components/AlertCustom';
export default class AddClientGroup extends Component{

    constructor(props){
        super(props);

        this.state = {
            clientName: '',
            iShowError: false,
        }

        this.getClientInput = this.getClientInput.bind(this);
        this._showError = this._showError.bind(this);
        this.insertClient = this.insertClient.bind(this);
    }

    getClientInput(text) {
        if(text.length >= 30){
            this.setState({
                iShowError: true,
                clientName: text
            });
        }else{
            this.setState({
                iShowError: false,
                clientName: text
            });
        }
    }

    _showError = () => {
        if(this.state.iShowError){
            return (
                <Text style={styles.textError}>Tên nhóm không được để trống, không vượt quá 30 ký tự</Text>
            )
        }else{
            return null;
        }
    }
 
    insertClient = () => {
        console.log(this.state.clientName);
        if(this.state.clientName.length  == 0){
            this.setState({iShowError: true});
        }else{

            insertClientGroup({id: (new Date()).getTime(), name: this.state.clientName}).then((model) => {
                AlertCustom('Thông báo', 'Thêm khách hàng thành công');
            }).catch((error) => {
                console.log(error);
                AlertCustom('Lỗi', JSON.stringify(error));
            })
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <TextInput
                    style={styles.input}
                        placeholder='Vui lòng nhập tên nhóm'
                        maxLength={30}
                        onChangeText = { this.getClientInput}
                    />
                    { this._showError() }
                </View>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.button} onPress={() => this.insertClient()}>
                        <Text style={{color: Constant.Color.White, fontWeight: 'bold'}}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        marginTop: 10,
        width: '90%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'red',
        paddingBottom: 5,
        paddingTop: 5,
    },
    textError: {
        marginTop: 4,
        color: Constant.Color.Red,
    },
    input: {
        padding: 0,
        borderColor: Constant.Color.Silver,
        borderBottomWidth: 1
    }
})