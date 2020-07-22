import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconNext(props){
    return (
        <Icon
            name='arrow-right'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
        />
    )
}