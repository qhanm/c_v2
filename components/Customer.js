import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Constant from '../constants/Constant';
import Icon from '../icons/Icon';
import { SessionContext } from '../contexts/SessionContext';
import realm, {deleteCustomer, getCustomer} from "../databases/Schema";
import AlertCustom from "./AlertCustom";
import Helpers from "../utils/Helpers";

export default class Customer extends Component{
    constructor(props){
        super(props);

        this.state = {
            totalWeight: 0,
            priceResult: 0,
            customer: this.props.customer,
        }
        realm.addListener('change', () => {

        })
    }

    componentDidMount(){
        let {totalWeight, priceResult} = this.state;
        let {customer} = this.state;
        let weight = 0;
        let price = 0;
        let totalCount = 0
        customer.sheets.map((item, i) => {
            weight = weight + item.value;
            if(item.value > 0){
                totalCount += 1;
            }
        })

        weight = parseFloat((weight / 10) - (totalCount / customer.numberPackaging)).toFixed(2);
        this.setState({totalWeight: weight, priceResult: (weight * customer.price)});
    }

    componentWillUnmount() {

    }
    //const { setCustomerId } = React.useContext(SessionContext);

    render(){
        let {customer, navigation} = this.props;

        return (
            <SessionContext.Consumer>
                {
                    sessionContext =>
                        <View style={styles.container}>
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => {
                                    sessionContext.setCustomerId(customer.id);
                                    navigation.navigate('CustomerDetailScreen')
                                }}>
                                    <Text style={{marginLeft: 20, color: Constant.Color.Blue, fontWeight: 'bold', fontSize: 16}}>
                                        {customer.name + ' - ' + customer.nameTree}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{padding: 5, backgroundColor: Constant.Color.Red, borderRadius: 3}}
                                    onPress={() => Alert.alert(
                                        'Thông báo',
                                        'Bạn có chắc muốn xóa?',
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "OK", onPress: () => {this.props.__deleteCustomer(customer.id)} }
                                        ]
                                    )}
                                >
                                    <Icon.Delete qhColor={Constant.Color.White} qhSize={14} qhStyle={styles.iconDelete}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.body}>
                                <View style={styles.row}>
                                    <Icon.Date qhSize={14} qhColor={Constant.Color.Black} qhStyle={styles.sMarginLef}/>
                                    <Text style={[styles.sMarginLef, {fontWeight: 'bold', marginLeft: 10}]}>{customer.dateCalculator}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon.Calculator qhSize={14} qhColor={Constant.Color.Blue} qhStyle={styles.sMarginLef}/>
                                    <Text style={styles.sMarginLef}>KL: {this.state.totalWeight} Kg x {customer.price} VND</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon.Price qhSize={14} qhColor={Constant.Color.Red} qhStyle={styles.sMarginLef}/>
                                    <Text style={[styles.sMarginLef, {marginLeft: 5}]}>TT: {Helpers.formatMoney(this.state.priceResult)} VND</Text>
                                </View>
                            </View>
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
        alignItems: 'center',
    },
    card: {
        width: '90%',
        marginTop: 10,
        padding: 5,
        backgroundColor: Constant.Color.Silver,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: Constant.Color.Red,
        padding: 3,
    },
    body: {
        
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        borderBottomWidth: 1,
        borderColor: Constant.Color.Grey,
    },
    sMarginLef: {
        marginLeft: 10
    }
})