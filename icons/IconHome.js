import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconHome(props){
    return (
        <Icon
            name='home'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
        />
    )
}