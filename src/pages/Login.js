import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = formData;

  const onChange = (name, value) => setFormData({ ...formData, [name]: value });

  const onSubmit = async () => {
    try {
      const res = await axios.post('http://192.168.1.128:5000/api/auth/login', {
        username,
        password,
      });
      console.log(res.data);
      // Store the token in local storage or state management
      // localStorage.setItem('token', res.data.token);
      // Navigate to Home page after successful login
      navigation.navigate('Home');
    //   Alert.alert('Success', 'Login successful');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        Alert.alert('Error', err.response.data.msg);
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Input
        placeholder="Username"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={username}
        onChangeText={(value) => onChange('username', value)}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "eye-slash" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        }
        value={password}
        onChangeText={(value) => onChange('password', value)}
        secureTextEntry={!showPassword}
        inputStyle={styles.input}
      />
      <Button
        title="Login"
        buttonStyle={styles.button}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
});

export default Login;
