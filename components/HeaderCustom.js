import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../icons/Icon';
import Constant from '../constants/Constant';
import { SessionContext } from '../contexts/SessionContext';



export default class HeaderCustom extends Component {
    constructor(props){
        super(props);

        this.__onPressGoBack = this.__onPressGoBack.bind(this);

        const {index, routes} = props.navigation.dangerouslyGetState();
        console.log(routes);
    }

    __onPressGoBack = (navigation, sessionContext) => {
        sessionContext.setTextHeader('NHÓM BẢNG TÍNH');
        navigation.goBack();
    }

    componentDidMount(){
        
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
                                (<TouchableOpacity onPress={ () => {sessionContext.setTextHeader('NHÓM BẢNG TÍNH'); this.props.navigation.goBack()} } style={{alignItems: 'baseline'}}>
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
