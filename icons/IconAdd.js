import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconAdd(props){
    return (
        <Icon
            name='plus-circle'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}