import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../icons/Icon';
import Constant from '../constants/Constant';
import { SessionContext } from '../contexts/SessionContext';



export default class HeaderCustom extends Component {
    constructor(props){
        super(props);

        this.__onPressGoBack = this.__onPressGoBack.bind(this);

        
        //console.log(routes[index].name);
    }

    __onPressGoBack = (navigation, sessionContext) => {
        const {index, routes} = this.props.navigation.dangerouslyGetState();
        console.log(routes[index].name);
        if(routes[index].name == 'CustomersScreen'){
            sessionContext.setTextHeader('NHÓM BẢNG TÍNH');
        }else if(routes[index].name == 'CustomerDetailScreen'){
            //navigation.state.params.onNavigateBack({data: '123'})
        }
        navigation.goBack();
    }

    componentDidMount(){
        //console.log(this.routes);
    }

    render(){
        return (
            <SessionContext.Consumer>
                {
                    sessionContext =>
                    <View style={[styles.container]}>
                        <View style={[styles.containerHeader, {width: '15%'}]}>
                            {
                                this.props.isBack ? 
                                (<TouchableOpacity onPress={ () => {this.__onPressGoBack(this.props.navigation, sessionContext)} } style={{alignItems: 'baseline'}}>
                                    <Icon.Back qhSize={18} qhColor={Constant.Color.White} qhStyle={{ marginLeft: 10 }} />
                                </TouchableOpacity>)
                                : 
                                <Text></Text>
                            }
                            
                        </View>
                        <View style={[styles.containerHeader, {alignItems: 'center', width: '70%'}]}>
                            <Text style={styles.containerText}>{sessionContext.textHeader}</Text>
                        </View>
                        <View style={[styles.containerHeader, {width: '15%'}]}>
                            {
                                this.props.isAdd ? 
                                <TouchableOpacity onPress= {() => this.props.navigation.navigate(this.props.moveScreen, {clientId: sessionContext.clientId})}>
                                    <Icon.Add qhSize={30} qhColor={Constant.Color.White} style={styles.iconAdd}/>
                                </TouchableOpacity>
                                : 
                                null
                            }
                        </View>
                    </View>
                }
            </SessionContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.Color.Red,
        flexDirection: 'row',
        height: 50,
    },
    containerHeader: {
        justifyContent: 'center',
    },
    containerText: {
        fontWeight: 'bold',
        alignItems: 'center',
        color: Constant.Color.White,
        
    },
    iconAdd: {
        backgroundColor: Constant.Color.White,
        color: Constant.Color.Red,
    }
});
