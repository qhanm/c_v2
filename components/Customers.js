import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import Customer from './Customer';
import realm, {allCustomer, deleteCustomer} from '../databases/Schema';
import AlertCustom from './AlertCustom';

export default class Customers extends React.Component{
    _isMounted = false;

    constructor(props){
        super(props);

        this.state = {
            customers: [],
        }
        realm.addListener('change', () => {
            this.loadCustomer(this.props.clientId);
        })

        this.loadCustomer = this.loadCustomer.bind(this);
        this.__deleteCustomer = this.__deleteCustomer.bind(this);
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
        this._isMounted = true;
        console.log('customerssssssssss')

        this.loadCustomer(this.props.clientId);
    }

    componentWillUnmount() {
        this._isMounted = false;

        this.setState = (state,callback)=>{
            return;
        };
    }

    __deleteCustomer = (customerId) => {
        deleteCustomer(customerId).then(() => {

        }).catch((error) => {
            AlertCustom('Lỗi', JSON.stringify(error));
            console.warn(error);
        })
    }

    render(){
        return (
            <View>
            {
                this.state.customers.map((item, i) => {
                    return <Customer
                        navigation={this.props.navigation}
                        customer={item} key={i}
                        clientId = {this.props.clientId}
                        loadCustomer={this.loadCustomer}
                        __deleteCustomer={this.__deleteCustomer}
                    />
                })
            }
            </View>
        )
   }
}