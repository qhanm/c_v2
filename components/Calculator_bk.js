import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { SessionContext } from '../contexts/SessionContext';
import { getOneCustomer, getCountSheetNoCustomer } from '../databases/Schema';
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
        this.__updateValueSheet = this.__updateValueSheet.bind(this);
        this.__onSubmitEditing = this.__onSubmitEditing.bind(this);
        this.__setValueInput = this.__setValueInput.bind(this);
        this.__renderSheetLine = this.__renderSheetLine.bind(this);
    }

    loadCustomer = (customerId) => {
        getOneCustomer(customerId, 2).then((sheets) => {
            this.setState({sheets});
        }).catch((error) => {
            this.setState({sheets: []})
            console.log(error)
            AlertCustom('Error', JSON.stringify(error));
        })
    }

    componentDidMount(){
        console.log('did mound')
        getCountSheetNoCustomer(this.props.customerId).then((customer) => {
            this.setState({totalPage: customer});
        }).catch((error) => {
            console.log(error);
            this.setState({totalPage: 0});
            AlertCustom('Lỗi', JSON.stringify(error));
        })

        this.loadCustomer(this.props.customerId);

    }

    __updateValueSheet = (sheetId, value) => {
        //console.log(sheetId);
        //console.log(value);
        //console.log(this.state.valueInput);
    }

    __onSubmitEditing = (event, key) => {
        console.log('call');
        console.log(key);

    }

    __setValueInput = (sheetId, value, isChange) => {
        if(value.length > 0 && value.substr(0, 1) == 0){
            value = value.substr(1);
        }

        // default when create
        if(value == -1){
            value = 0;
        }

        if(this.state.sheetId == sheetId){
            if(this.state.valueInput == -2){
                this.setState({ valueInput: value });
                return value;
            }else{
                if(isChange){
                    this.setState({ valueInput: value });
                }
                return this.state.valueInput;
            }
        }else{
            return value;
        }
    }

    __renderSheetLine = (iFor) => {
        let sheetLine = [];

        if(this.state.sheets.length > 0)
        {
            for(let i = (iFor * 5); i < (iFor * 5) + 5; i++)
            {
                sheetLine[i] = (
                    <View style={styles.box1} key={i}>
                        <TextInput 
                            style={[styles.textBox1, {backgroundColor: `${ i ==0 ? Constant.Color.Silver : Constant.Color.Grey }`}]} 
                            keyboardType='numeric' 
                            placeholder='0' 
                            ref={'input_' + i}
                            value={ `${i}` }
                            editable={i == 0 ? true : false}
                            autoFocus={ i == 0 ? true : false }
                            onSubmitEditing = {(event) => { this.refs['input_1'].focus()}}
                            onChangeText = {(text) => { console.log('call') }}
                        />                       
                    </View>
                )
            }
        }
        
        return sheetLine;
    }

    render(){
        let sheetContent = [];

        for(let i = 0; i < 5; i++)
        {
            sheetContent[i] = (<View style={styles.body} key={i}>
                                {
                                    this.__renderSheetLine(i)
                                }
                                
                            </View>)
        }

        let contentRender = 
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
            
                {sheetContent}
            </View>
        </View>
        ;

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
                    {contentRender}
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
        flexDirection: 'row',
        marginBottom: 4,
    }, 
    box1: {
        width: '20%',
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