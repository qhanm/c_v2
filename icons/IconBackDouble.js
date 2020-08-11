import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconBackDouble(props){
    return (
        <Icon
            name='angle-double-left'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}