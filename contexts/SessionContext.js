import React, { Component } from 'react';

export const SessionContext = React.createContext();

export class SessionProvider  extends Component
{
    constructor(props){
        super(props);

        this.state = {
            textHeader: 'NHÓM BẢNG TÍNH',
            clientId: 0,
            customerId: 0,
        }

        this.setTextHeader = this.setTextHeader.bind(this);
        this.setClientId = this.setClientId.bind(this);
        this.setCustomerId = this.setCustomerId.bind(this);
    }

    setCustomerId = (customerId) => {
        this.setState({customerId: customerId});
    }

    setTextHeader = (text) => {
        this.setState({
            textHeader: text
        })
    }

    setClientId = (id) => {
        this.setState({clientId: id})
    }

    render(){
        return(
            <SessionContext.Provider
                value={{
                    textHeader: this.state.textHeader,
                    setTextHeader: this.setTextHeader,
                    clientId: this.state.clientId,
                    setClientId: this.setClientId,
                    customerId: this.state.customerId,
                    setCustomerId: this.setCustomerId,
                }}
            >
                {this.props.children}
            </SessionContext.Provider>
        )
    }
}