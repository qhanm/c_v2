import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconBack(props){
    return (
        <Icon
            name='arrow-circle-left'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}