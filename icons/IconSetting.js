import React from 'react';
import { Icon } from 'react-native-elements';

export default function IconSetting(props){
    return (
        <Icon
            name='cogs'
            type='font-awesome-5'
            color={props.qhColor}
            size={props.qhSize}
        />
    )
}