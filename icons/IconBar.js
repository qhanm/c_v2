import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconBar(props){
    return (
        <Icon
            name='bars'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}