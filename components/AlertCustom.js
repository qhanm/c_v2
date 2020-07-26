import React from 'react';
import {Alert} from 'react-native';

const AlertCustom = (title, error) => {
    Alert.alert(
        title,
        error,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
}

export default AlertCustom;