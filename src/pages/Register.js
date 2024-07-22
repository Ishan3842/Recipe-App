import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChange = (name, value) => setFormData({ ...formData, [name]: value });

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://192.168.1.128:5000/api/auth/register', {
        username,
        password,
      });
      console.log(res.data);
      // Navigate to ProfileSetup page after successful registration
      navigation.navigate('ProfileSetup');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        Alert.alert('Error', err.response.data.msg);
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
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
      <Input
        placeholder="Confirm Password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        rightIcon={
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        }
        value={confirmPassword}
        onChangeText={(value) => onChange('confirmPassword', value)}
        secureTextEntry={!showConfirmPassword}
        inputStyle={styles.input}
      />
      <Button
        title="Register"
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

export default Register;
