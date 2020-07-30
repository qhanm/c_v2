import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Constant from '../constants/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {insertCustomer} from '../databases/Schema';
import AlertCustom from './AlertCustom';

export default class AddCustomer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            price: 0,
            name: '',
            nameTree: '',
            nameError: '',
            nameTreeError: '',
            isError: false,
        };

        console.log(this.props);
        
    }

    insertCustomer = () => {
        if(this.state.name.length == 0){
            this.setState({nameError: 'Tên nông dân không được để trống'});
        }else if(this.state.name.length > 30){
            this.setState({nameError: 'Tên nông dân không được vượt quá 30 ký tự'});
        }else{
            this.setState({nameError: ''});
        }

        if(this.state.nameTree.length == 0){
            this.setState({nameTreeError: 'Tên giống không được để trống'});
        }else if(this.state.nameTree.length > 30){
            this.setState({nameTreeError: 'Tên giống không được vượt quá 30 ký tự'});
        }else{
            this.setState({nameError: ''});
        }

        if(this.state.nameError.length > 0 || this.state.nameTreeError.length > 0){
            return false;
        }

        insertCustomer({name: this.state.name, nameTree: this.state.nameTree, price: this.state.price}, this.props.clientId)
        .then((model) => {
            AlertCustom('Thông báo', 'Thêm nông dân thành công');
        }).catch((error) => {
            console.log(error);
            AlertCustom('Error', JSON.stringify(error));
        })
    }


    render(){
        return (
            <View style={styles.container}>
                <View style={styles.card}> 
                    <View style={styles.row}> 
                        <Text style={styles.colLeft}>
                            Nông Dân
                        </Text> 
                        <TextInput style={styles.colRight}
                            placeholder='Không được để trống'
                            onChangeText={(text) => this.setState({name: text})}
                        />
                    </View>
                    {
                        this.state.nameError.length > 0 ? 
                        (
                        <View><Text style={{color: Constant.Color.Red}}>{this.state.nameError}</Text></View>
                        ) 
                        : null
                    }
                    <View style={styles.row}> 
                            <Text style={styles.colLeft}>
                                Tên Giống
                            </Text> 
                            <TextInput 
                                style={styles.colRight} 
                                underlineColorAndroid='transparent'
                                placeholder='Không được để trống'    
                                onChangeText={(text) => this.setState({nameTree: text})}
                            />
                    </View>
                    {
                        this.state.nameTreeError.length > 0 ? 
                        (
                        <View><Text style={{color: Constant.Color.Red}}>{this.state.nameTreeError}</Text></View>
                        ) 
                        : null
                    }
                    <View style={styles.row}> 
                        <Text style={styles.colLeft}>
                            Giá Mua
                        </Text> 
                        <TextInput 
                            style={styles.colRight} 
                            keyboardType='numeric'
                            placeholder='Có thể để trống'
                            onChangeText={(number) => this.setState({price: parseInt(number)})}  
                        />
                    </View>
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                        <TouchableOpacity 
                            style={styles.buttonSave}
                            onPress={() => this.insertCustomer()}
                        >
                            <Text style={{color: Constant.Color.White, fontWeight: 'bold'}}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    card: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        //backgroundColor: Constant.Color.Silver,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5,
        padding: 5,
        width: '90%',
        alignItems: 'center',
    },
    colLeft: {
        backgroundColor: 'red',
        width: '30%',
        padding: 6,
        color: Constant.Color.White,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    colRight: {
        borderColor: 'gray', 
        borderWidth: 1,
        height: 30,
        fontSize: 15,
        padding: 3,
        width: '70%',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        
    },
    buttonSave: {
        padding: 3,
        backgroundColor: Constant.Color.Red,

    }
})