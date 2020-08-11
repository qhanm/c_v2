import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { SessionContext } from '../contexts/SessionContext';
import { getOneCustomer, updateSheet } from '../databases/Schema';
import AlertCustom from './AlertCustom';
import Icon from '../icons/Icon';
import Constant from '../constants/Constant';

export default class Calculator extends Component
{
    constructor(props){
        super(props);

        this.state = {
            contentRender: [],
            sheets: [],
            totalPage: 0,
            currentPage: 1,
            valueInput: -2,
            sheetId: '',
        }

        this.loadCustomer = this.loadCustomer.bind(this);
        this.__onChangeNumber = this.__onChangeNumber.bind(this);
        this.__updateSheet = this.__updateSheet.bind(this);
    }

    loadCustomer = (customerId) => {
        getOneCustomer(customerId, 2).then((sheets) => {

            let result  = []

            sheets.map((item, i) => {
                result[i] = item
            })

            this.setState({sheets: result});
        }).catch((error) => {
            this.setState({sheets: []})
            console.log(error)
            AlertCustom('Error', JSON.stringify(error));
        })
    }

    __updateSheet = (sheetNo, value, i) => {
        updateSheet(sheetNo, value).then((sheet) => {            
            let {sheets} = this.state;
            sheets[i] = sheet;
            this.setState({sheets});
        }).catch((error) => {
            console.log(error);
            AlertCustom('Error', JSON.stringify(error));
        })
    }

    componentDidMount(){
        this.loadCustomer(this.props.customerId);
    }

    __onChangeNumber = (id, number, i) => {

        if(number.length > 0 && number.substr(0, 1) == 0){
            number = number.substr(1);
        }


        this.__updateSheet(id, parseInt(number), i);
    }

    __renderBoxContent = (iFor) => {

        let content = [];

        if(this.state.sheets.length > 0)
        {
            for(let i = (iFor * 5); i < (iFor * 5) + 5; i++)
            {
                content[i] = (
                    <View style={styles.box1} key={i}>
                        <TextInput 
                            style={[styles.textBox1, {}]} 
                            keyboardType='numeric' 
                            placeholder='0'
                            value={`${this.state.sheets[i].value}`}
                            onChangeText={(number) => {this.__onChangeNumber(this.state.sheets[i].id,number, i)}}
                        />  
                    </View>
                )
            }
        }
        return content;
    }

    render(){

        let contentRender = [];

        for(let i = 0; i < 5; i++)
        {
            contentRender[i] = (
                <View style={styles.body} key={i}>
                    
                    { this.__renderBoxContent(i) }

                </View>
            )
        }

        return(
                <View>
                    <View style={styles.headerTop}>
                        <View style={[styles.headerCol, {width: '20%'}]}>
                            <Icon.BackDouble />
                        </View>
                        <View style={[styles.headerCol, {width: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text>Tổng trang: { this.state.totalPage}</Text>
                            <TextInput style={[styles.textBox1, {width: 40, marginLeft: 5}]} keyboardType='numeric'/>
                        </View>
                        <View style={[styles.headerCol, {width: '20%'}]}>
                            <Icon.NextDouble />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.title}>
                            <Text>Trang tinh: {this.state.currentPage}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.header}>
                                <View style={styles.box}>
                                    <Text style={styles.textBox}>C1</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.textBox}>C2</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.textBox}>C3</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.textBox}>C4</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.textBox}>C5</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View style={{flexDirection: 'row'}}>
                            { contentRender }
                        </View>
                                            
                    </View>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        marginTop: 15,
        borderColor: 'gray', 
        borderWidth: 1,
        paddingTop: 3,
        paddingBottom: 3,
    },
    headerCol: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 15,
        borderColor: 'gray', 
        borderWidth: 1,
    },
    row: {
        flexDirection: 'column',
    },
    title: {

    },
    box: {
        width: '20%',
    },
    textBox: {
        textAlign: 'center',
        paddingBottom: 3,
        paddingTop: 3,
        color: 'red',
        fontWeight: 'bold',
    },  

    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        width: '20%',
        flexDirection: 'column',
        marginBottom: 4,
    }, 
    box1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 7,
    },
    textBox1: {
        borderColor: 'gray', 
        borderWidth: 1,
        height: 30,
        fontSize: 15,
        width: '60%',
        borderRadius: 3,
        padding: 3,
        textAlign: 'center',
    }
})