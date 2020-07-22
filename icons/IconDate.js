import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconDate(props){
    return (
        <Icon
            name='calendar-alt'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
            style={props.qhStyle}
        />
    )
}