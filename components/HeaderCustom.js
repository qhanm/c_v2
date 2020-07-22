import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../icons/Icon';
import Constant from '../constants/Constant';

export default function HeaderCustom(props) {
    const navigation = props.navigation;
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                {
                    props.isBack ? 
                    (<TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems: 'baseline'}}>
                        <Icon.Back qhSize={18} qhColor={Constant.Color.White} qhStyle={{ marginLeft: 10 }} />
                    </TouchableOpacity>)
                    : 
                    <Text></Text>
                }
                
            </View>
            <View style={[styles.containerHeader, {alignItems: 'center'}]}>
                <Text style={styles.containerText}>{props.title}</Text>
            </View>
            <View style={styles.containerHeader}>
                {
                    props.isAdd ? 
                    <TouchableOpacity onPress= {() => navigation.navigate(props.moveScreen)}>
                        <Icon.Add qhSize={30} qhColor={Constant.Color.White} style={styles.iconAdd}/>
                    </TouchableOpacity>
                    : 
                    null
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Constant.Color.Red,
        flexDirection: 'row',
        height: 50,
    },
    containerHeader: {
        flex: 1,
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
