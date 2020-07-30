import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconPrice(props){
    return (
        <Icon
            name='money-bill-alt'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}