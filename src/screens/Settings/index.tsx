import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';

const Settings = (props:any) => {
    const { navigation } = props;
    return(
        <View style={CommonStyles.fullFlexCenter}>
          <Button
            title='Logout'
            onPress={()=> navigation.navigate('Login')}
            />
        </View>
    );
};

export default Settings;