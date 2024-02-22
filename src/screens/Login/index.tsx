import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import CommonStyles from '../../styles/CommonStyles';
import CustomColors from '../../asset/colors';
import {post} from '../../api';
import {UserLogin} from '../../actions/UserAction';

const Login = (props: any) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {navigation} = props;

  const handleLogin = () => {
    console.log("loooooooooooooooooooooo");
    
    const param = {
      Username: username,
      Password: password,
    };
    UserLogin(param)?.then(result => {
      console.log('result===================>', result);

      if (result.StatusMessage === 'Success') {
        // navigation.navigate('DashBoard');
        console.log("EncUserId===============>",result.Output.EncUserID);
        
        navigation.navigate('DashBoard', {
          EncUserId: result.Output.EncUserID,
        });
      } else {
        console.log('login faild', result);

        setErrorMessage('Invalid username or password');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>DESTIMATE</Text>

      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={pass => setPassword(pass)}
        />
        <View style={CommonStyles.W90}>
          <TouchableOpacity
            style={styles.buttonContainer}
            //  onPress={() => navigation.navigate('DashBoard')}
            // onPress={handleLogin}
            onPress={()=> navigation.navigate('DashBoard', {
              EncUserId: "dummy userId",
            })}
            >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CustomColors.Secondary,
  },
  heading: {
    textAlign: 'center',
    color: CustomColors.PrimaryBlue,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  loginContainer: {
    backgroundColor: CustomColors.lightBlue,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 70,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: CustomColors.lightGrey,
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: CustomColors.PrimaryBlue,
    width: '100%',
    borderRadius: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    color: CustomColors.Secondary,
    fontSize: 18,
    fontWeight: '800',
  },
  aware: {
    flexGrow: 1,
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: CustomColors.PrimaryBlue,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
