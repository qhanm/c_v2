import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Constant from '../constants/Constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCustomer, updateCustomer} from "../databases/Schema";
import construct from "@babel/runtime/helpers/esm/construct";
import Helpers from "../utils/Helpers";
import realm from '../databases/Schema';
import AlertCustom from "./AlertCustom";

export default class CustomerDetail extends Component{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            customer: {},
            totalWeight: 0,
            totalB: 0,
            totalBB: 0,
            weightResult: 0,
            priceResult: 0
        }
        realm.addListener('change', () => {
            this.loadCustomer(this.props.customerId);
        })
        const {navigation, customerId} = this.props;

        this.loadCustomer = this.loadCustomer.bind(this);
        this.__calculator = this.__calculator.bind(this);
    }

    loadCustomer = (customerId) => {
        getCustomer(customerId).then((customer) =>{
            this.setState({customer});
            this.__calculator(customer);
        }).catch((error) => {
            console.log(error);
        })
    }

    __calculator = (customer) => {
        let totalWeight = 0;
        let totalB = 0;
        customer.sheets.map((item, i) => {
            totalWeight += item.value;

            if(item.value > 0){
                totalB += 1;
            }
        })
        this.setState({totalWeight: totalWeight / 10, totalB, totalBB: totalB / customer.numberPackaging});
    }

    __updateData = (id, value, type) => {
        if(value == '' || value == undefined){
            value = 0;
        }
        updateCustomer(id, parseInt(value), type).then((customer) => {
            this.setState({customer});
        }).catch((error) => {
            AlertCustom('Lỗi', JSON.stringify(error));
            console.warn(error);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;

        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidMount(){
        this._isMounted = true;

        this.loadCustomer(this.props.customerId);
    }

    updateStateInput = (number, type) => {
        let { customer } = this.state;
        if(type == 'numberPackaging'){
            customer.numberPackaging = Number(number);
        }else if(type == 'price'){
            customer.price = Number(number);
        }

        this.setState({customer});
    }

    render(){

        const {customer, totalWeight, totalB, totalBB, weightResult, priceResult} = this.state;

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
                                <Text style={styles.bodyRowRight}>{ customer.dateCalculator }</Text>
                            </View>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowLeft}>Họ và tên</Text>
                                <Text style={styles.bodyRowRight}>{ customer.name }</Text>
                            </View>
                            <View style={styles.bodyRow}>
                                <Text style={styles.bodyRowLeft}>Tên giống</Text>
                                <Text style={styles.bodyRowRight}>{ customer.nameTree }</Text>
                            </View>
                            <Text style={styles.lineHr}></Text>
                            <View style={styles.bodyRow3}>
                                <Text style={[styles.bodyRow3Left, {color: Constant.Color.Red}]}>Tổng KL</Text>
                                <TextInput
                                    style={[
                                        styles.bodyRow3Center, styles.input,
                                        {backgroundColor: Constant.Color.Silver, borderLeftWidth: 1, borderLeftColor: Constant.Color.White}
                                    ]}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={`${totalWeight}`}
                                    editable={false}
                                />
                                <Text style={styles.bodyRow3Right}>Kg</Text>
                            </View>
                            <View style={styles.bodyRow3}>
                                <Text style={styles.bodyRow3Left}>SL Bao</Text>
                                <TextInput
                                    style={[
                                        styles.bodyRow3Center, styles.input,
                                        {backgroundColor: Constant.Color.Silver, borderLeftWidth: 1, borderLeftColor: Constant.Color.White}
                                    ]}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={`${totalB}`}
                                    editable={false}
                                />
                                <Text style={styles.bodyRow3Right}>Cái</Text>
                            </View>
                            <View style={styles.bodyRow3}>
                                <Text style={styles.bodyRow3Left}>KL Bao/Kg</Text>
                                <TextInput
                                    style={[styles.bodyRow3Center, styles.input]}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={`${customer.numberPackaging}`}
                                    onChangeText={(number) => {this.__updateData(customer.id, number, 'numberPackaging')}}
                                />
                                <Text style={styles.bodyRow3Right}>Cái</Text>
                            </View>
                            <View style={styles.bodyRow3}>
                                <Text style={styles.bodyRow3Left}>KL Bao bì</Text>
                                <TextInput
                                    style={[styles.bodyRow3Center, styles.input, {backgroundColor: Constant.Color.Silver, borderLeftWidth: 1, borderLeftColor: Constant.Color.White}]}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={`${totalBB}`}
                                    editable={false}
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
                                    value={`${totalWeight - totalBB}`}
                                />
                                <Text style={styles.bodyRow3Right}>Kg</Text>
                            </View>
                            <View style={styles.bodyRow3}>
                                <Text style={styles.bodyRow3Left}>Giá mua</Text>
                                <TextInput
                                    style={[styles.bodyRow3Center, styles.input]}
                                    placeholder='0'
                                    keyboardType='numeric'
                                    value={`${customer.price}`}
                                    onChangeText={(value) => this.__updateData(customer.id ,value, 'price')}
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
                                    value={`${Helpers.formatMoney((totalWeight - totalBB) * customer.price)}`}
                                />
                                <Text style={styles.bodyRow3Right}>Vnđ</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress = {() => {this.props.navigation.navigate('CalculatorScreen')}}
                            >
                                <Text style={{width: '100%', color: Constant.Color.White}}>Bắt Đầu Cân</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
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