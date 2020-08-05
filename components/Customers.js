import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import Customer from './Customer';
import { allCustomer } from '../databases/Schema';
import AlertCustom from './AlertCustom';

export default class Customers extends React.Component{
   
    constructor(props){
        super(props);

        this.state = {
            customers: [],
        }
    }

    loadCustomer = (clientId) => {
        allCustomer(clientId).then((models) => {
            this.setState({customers: models});
        }).catch((error) => {
            console.log(error);
            this.setState({customers: []});
            AlertCustom('Lỗi', JSON.stringify(error));
        })
    }

    componentDidMount(){
        this.loadCustomer(this.props.clientId);
    }

    render(){
        return (
            <View>
            {
                this.state.customers.map((item, i) => {
                    return <Customer navigation={this.props.navigation} customer={item} key={i} />
                })
            }
            </View>
        )
   }
}