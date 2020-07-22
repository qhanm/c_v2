import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Constant from '../constants/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddCustomer(){
    return (
        <View style={styles.container}>
            <View style={styles.card}> 
                <View style={styles.row}> 
                    <Text style={styles.colLeft}>
                        Nông Dân
                    </Text> 
                    <TextInput style={styles.colRight}
                        placeholder='Không được để trống'
                    />
                </View>
                <View style={styles.row}> 
                        <Text style={styles.colLeft}>
                            Tên Giống
                        </Text> 
                        <TextInput 
                            style={styles.colRight} 
                            underlineColorAndroid='transparent'
                            placeholder='Không được để trống'    
                        />
                </View>
                <View style={styles.row}> 
                    <Text style={styles.colLeft}>
                        Giá Mua
                    </Text> 
                    <TextInput 
                        style={styles.colRight} 
                        keyboardType='numeric'
                        placeholder='Có thể để trống'     
                    />
                </View>
                <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}> 
                    <TouchableOpacity style={styles.buttonSave}>
                        <Text style={{color: Constant.Color.White, fontWeight: 'bold'}}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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