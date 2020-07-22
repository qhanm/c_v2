import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Constant from '../constants/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CustomerDetail(){
    return (
        <ScrollView style={{marginBottom: 50}}>
            <View style={styles.container}> 
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>
                            KẾT QUẢ
                        </Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyRow}>
                            <Text style={styles.bodyRowLeft}>Ngày cân</Text>
                            <Text style={styles.bodyRowRight}>8h:30' 20-10-2020</Text>
                        </View>
                        <View style={styles.bodyRow}>
                            <Text style={styles.bodyRowLeft}>Họ và tên</Text>
                            <Text style={styles.bodyRowRight}>Quách Hoài Nam</Text>
                        </View>
                        <View style={styles.bodyRow}>
                            <Text style={styles.bodyRowLeft}>Tên giống</Text>
                            <Text style={styles.bodyRowRight}>123zxwe</Text>
                        </View>
                        <Text style={styles.lineHr}></Text>
                        <View style={styles.bodyRow3}>
                            <Text style={[styles.bodyRow3Left, {color: Constant.Color.Red}]}>Tổng KL</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input]}
                                placeholder='0'
                                keyboardType='numeric'
                            />
                            <Text style={styles.bodyRow3Right}>Kg</Text>
                        </View>
                        <View style={styles.bodyRow3}>
                            <Text style={styles.bodyRow3Left}>SL Bao</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input]}
                                placeholder='0'
                                keyboardType='numeric'
                            />                            
                            <Text style={styles.bodyRow3Right}>Cái</Text>
                        </View>
                        <View style={styles.bodyRow3}>
                            <Text style={styles.bodyRow3Left}>KL Bao bì</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input]}
                                placeholder='0'
                                keyboardType='numeric'
                            />   
                            <Text style={styles.bodyRow3Right}>Kg</Text>
                        </View>
                        <Text style={styles.lineHr}></Text>
                        <View style={styles.bodyRow3}>
                            <Text style={styles.bodyRow3Left}>KL Còn lại</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input, {backgroundColor: Constant.Color.Yellow, borderWidth: 0}]}
                                placeholder='0'
                                keyboardType='numeric'
                                editable={false}
                            />   
                            <Text style={styles.bodyRow3Right}>Kg</Text>
                        </View>
                        <View style={styles.bodyRow3}>
                            <Text style={styles.bodyRow3Left}>Giá mua</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input]}
                                placeholder='0'
                                keyboardType='numeric'
                            />   
                            <Text style={styles.bodyRow3Right}>Vnđ</Text>
                        </View>
                        <View style={styles.bodyRow3}>
                            <Text style={[styles.bodyRow3Left, {color: Constant.Color.Red}]}>Thành tiền</Text>
                            <TextInput 
                                style={[styles.bodyRow3Center, styles.input, {backgroundColor: Constant.Color.Yellow}]}
                                placeholder='0'
                                keyboardType='numeric'
                                editable={false}
                            />   
                            <Text style={styles.bodyRow3Right}>Vnđ</Text>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{width: '100%', color: Constant.Color.White}}>Mở Khóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        marginTop: 10,
        borderColor: Constant.Color.Black,
        borderWidth: 1,
    },
    header: {
        padding: 5,
        borderBottomColor: Constant.Color.Red,
        borderBottomWidth: 1,
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Constant.Color.Red,
    },
    body: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyRow: {
        padding: 4,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyRowLeft: {
        width: '30%',
        backgroundColor: Constant.Color.Silver,
        borderRightColor: Constant.Color.Black,
        borderRightWidth: 1,
        textAlign: 'center',
        padding: 6,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    bodyRowRight: {
        width: '70%',
        padding: 6,
        backgroundColor: Constant.Color.Silver,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    bodyRow3: {
        padding: 4,
        marginTop: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyRow3Left: {
        width: '30%',
        backgroundColor: Constant.Color.Silver,
        borderRightColor: Constant.Color.Black,
        //borderRightWidth: 1,
        textAlign: 'center',
        padding: 6,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
    },
    bodyRow3Center: {
        width: '55%',
        padding: 6,
        //backgroundColor: Constant.Color.Silver,
    },
    bodyRow3Right: {
        width: '15%',
        textAlign: 'center',
        padding: 6,
        backgroundColor: Constant.Color.Silver,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
    },
    lineHr: {
        height: 5,
        borderColor: Constant.Color.Red,
        borderBottomWidth: 1,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: 'red',
    },
    input: {
        padding: 7, 
        height: 30, 
        fontSize: 15,
        color: Constant.Color.Black,
        fontWeight: 'bold',
        borderColor: Constant.Color.Black,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'right',
        //backgroundColor: Constant.Color.White,
    },
    button: {
        backgroundColor: Constant.Color.Red,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 4,
        paddingTop: 4,
        marginBottom: 4,
        borderRadius: 4,
    }
})