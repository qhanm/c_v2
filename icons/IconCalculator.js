import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconCalculator(props){
    return (
        <Icon
            name='calculator'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}