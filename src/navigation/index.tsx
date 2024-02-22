import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Home from '../screens/Home';
import {Images} from '../asset/images';
import Settings from '../screens/Settings';
import CommonStyles from '../styles/CommonStyles';
import CustomColors from '../asset/colors';


const Stack = createNativeStackNavigator();

const HeaderRightIcon = (props: any) => {
  const {onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={Images.sideBar}
        style={CommonStyles.sideBarIcon}
        tintColor={CustomColors.Secondary}
      />
    </TouchableOpacity>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DashBoard"
          component={Home}
          options={({navigation}) => ({
            headerRight: () => (
              <HeaderRightIcon
                onPress={() => navigation.navigate('Settings')}
              />
            ),
          })}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
