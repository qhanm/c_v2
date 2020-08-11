import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconNextDouble(props){
    return (
        <Icon
            name='angle-double-right'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}