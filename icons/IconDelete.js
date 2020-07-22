import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconDelete(props){
    return (
        <Icon
            name='trash-alt'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}