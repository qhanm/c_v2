import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Constant from '../constants/Constant';
import Icon from '../icons/Icon';

export default function Customer({navigation}){
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('CustomerDetailScreen')}>
                        <Text style={{marginLeft: 20, color: Constant.Color.Blue, fontWeight: 'bold', fontSize: 16}}>
                            Nam - Jasmin
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 5, backgroundColor: Constant.Color.Red, borderRadius: 3}}>
                        <Icon.Delete qhColor={Constant.Color.White} qhSize={14} qhStyle={styles.iconDelete}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Icon.Date qhColor={Constant.Color.White} qhSize={14} qhColor={Constant.Color.Blue} qhStyle={styles.sMarginLef}/>
                        <Text style={styles.sMarginLef}>20-12-2020</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon.Date qhColor={Constant.Color.White} qhSize={14} qhColor={Constant.Color.Blue} qhStyle={styles.sMarginLef}/>
                        <Text style={styles.sMarginLef}>20-12-2020</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon.Date qhColor={Constant.Color.White} qhSize={14} qhColor={Constant.Color.Blue} qhStyle={styles.sMarginLef}/>
                        <Text style={styles.sMarginLef}>20-12-2020</Text>
                    </View>
                </View>
            </View>
        </View>
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
        alignItems: 'center',
    },
    sMarginLef: {
        marginLeft: 10
    }
})