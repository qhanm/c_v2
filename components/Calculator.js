import React, {Component} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView, 
    Alert
} from 'react-native';
import { SessionContext } from '../contexts/SessionContext';
import { getOneCustomer, updateSheet, addSheet, getTotalSheet } from '../databases/Schema';
import AlertCustom from './AlertCustom';
import Icon from '../icons/Icon';
import Constant from '../constants/Constant';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Calculator extends Component
{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            contentRender: [],
            sheets: [],
            totalPage: 0,
            currentPage: 1,
            valueInput: -2,
            sheetId: '',
            heightKeyBoard: 0,
            calculatorGroup: [],
        }

        this.__onChangeNumber = this.__onChangeNumber.bind(this);
        this.__updateSheet = this.__updateSheet.bind(this);
        this.loadTotalSheet = this.loadTotalSheet.bind(this);
        this.loadCustomer = this.loadCustomer.bind(this);
        this.__renderBoxContent = this.__renderBoxContent.bind(this);
        this.__addNewSheet = this.__addNewSheet.bind(this);
        this.__renderRowResult = this.__renderRowResult.bind(this);
        this.__loadPrePage = this.__loadPrePage.bind(this);
        this.__loadNextPage = this.__loadNextPage.bind(this);
        this.__onSearchPage = this.__onSearchPage.bind(this);
    }

    loadTotalSheet = (customerId) => {
        getTotalSheet(customerId).then((sheets) => {
            this.setState({totalPage: sheets})
        }).catch((error) => {
            console.log(error);
        })
    }

    loadCustomer = (customerId, sheetNo) => {
        getOneCustomer(customerId, sheetNo).then((sheets) => {
            let result  = []
            let calculatorForRow = [];
            let row = 0;

            sheets.map((item, i) => {
                result[i] = item;
                // calculator each row
                if(( i ) % 5 == 0){
                    row = ( i ) / 5;
                    calculatorForRow[row] = item.value  + (calculatorForRow[row] ? calculatorForRow[row] : 0);
                }else{
                    calculatorForRow[row] = item.value  + (calculatorForRow[row] ? calculatorForRow[row] : 0);
                }
            })
            
            this.setState({sheets: result, calculatorGroup: calculatorForRow});
        }).catch((error) => {
            this.setState({sheets: []})
            console.log(error)
            AlertCustom('Error', JSON.stringify(error));
        })
    }

    __updateSheet = (sheetNo, value, i) => {
        updateSheet(sheetNo, value).then((sheet) => {            
            let {sheets, calculatorGroup} = this.state;
            
            // update
            let oldSheet = sheets[i];

            let key = Math.floor(i/5);
            if(oldSheet.value > value){
                calculatorGroup[key] = calculatorGroup[key] - (oldSheet.value - value);
            }else{
                calculatorGroup[key] = calculatorGroup[key] + (value - oldSheet.value);
            }

            sheets[i] = sheet;
            this.setState({sheets, calculatorGroup});
        }).catch((error) => {
            console.log(error);
            AlertCustom('Error', JSON.stringify(error));
        })
    }

    componentDidMount(){
        this._isMounted = true;
        this.loadCustomer(this.props.customerId, this.state.currentPage);
        this.loadTotalSheet(this.props.customerId);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }

    __onChangeNumber = (id, number, i) => {
        if(number.length > 0 && number.substr(0, 1) == 0){
            number = number.substr(1);
        }

        if(number == '' || number == undefined){
            number = 0;
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
                            value={`${this.state.sheets[i].value == -1 ? 0 : this.state.sheets[i].value}`}
                            //onChangeText={(number) => { this.__updateStateInput(number, i) }}
                            onChangeText={(number) => {this.__onChangeNumber(this.state.sheets[i].id,number, i)}}
                            //onSubmitEditing={(event) => {this.__onChangeNumber(this.state.sheets[i].id, event.nativeEvent.text, i)}}
                        />
                    </View>
                )
            }
        }
        return content;
    }

    __addNewSheet = () => {
        addSheet(this.props.customerId).then((sheets) => {
            this.setState({totalPage: this.state.totalPage + 1});
        }).catch((error) => {
            console.log(error);
        })
    }
    __renderRowResult = () => {
        let content = [];
        for(let i = 0; i < 5; i++)
        {
            content[i] = (
                <View style={styles.box} key={i}>
                    <Text style={styles.textBox}>{this.state.calculatorGroup[i]}</Text>
                </View>
            )
        }
        return content;
    }

    __loadNextPage = () => {
        if(this.state.currentPage < this.state.totalPage) {
            let page = this.state.currentPage + 1
            this.setState({currentPage: page}) ;
            this.loadCustomer(this.props.customerId, page);
        }
    }

    __loadPrePage = () => {
        if(this.state.currentPage > 1){
            let page = this.state.currentPage - 1
            this.setState({currentPage: page});
            this.loadCustomer(this.props.customerId, page);
        }
    }

    __onSearchPage = (event) => {
        let page = parseInt(event.nativeEvent.text);
        if(page > 0 && page < this.state.totalPage){
            this.setState({currentPage: page});
            this.loadCustomer(this.props.customerId, page);
        }
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
            <KeyboardAvoidingView
                behavior="height"
                keyboardVerticalOffset = {70}
            >
                <ScrollView>
                    <View style={styles.headerTop}>
                        <View style={[styles.headerCol, {width: '20%'}]}>
                            <TouchableOpacity
                                onPress = {() => { this.__loadPrePage() }}
                            >
                                <Icon.BackDouble />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.headerCol, {width: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text>Tổng trang: { this.state.totalPage}</Text>
                            <TextInput
                                style={[styles.textBox1, {width: 40, marginLeft: 5}]}
                                keyboardType='numeric'
                                //value={`${this.state.currentPage}`}
                                onSubmitEditing={(event) => { this.__onSearchPage(event) }}
                            />
                        </View>
                        <View style={[styles.headerCol, {width: '20%'}]}>
                            <TouchableOpacity
                                onPress = {() => { this.__loadNextPage() }}
                            >
                                <Icon.NextDouble />
                            </TouchableOpacity>
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
                        <View style={styles.row}>
                            <View style={styles.header}>
                            
                                {this.__renderRowResult()}
                            </View>
                        </View>   
                        <View style={styles.row}>
                            <TouchableOpacity 
                                style={{backgroundColor: 'red', padding: 5, marginBottom: 5, borderRadius: 3}}
                                onPress={() => Alert.alert(
                                    'Thông báo',
                                    'Bạn có muốn thêm trang mới?',
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () => {this.__addNewSheet()} }
                                    ]
                                )} 
                            >
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>Thêm Trang Mới</Text>
                            </TouchableOpacity>    
                        </View>                 
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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