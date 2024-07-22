import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const ProfileSetup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
  });

  const { firstName, lastName, dateOfBirth, gender } = formData;

  const onChange = (name, value) => setFormData({ ...formData, [name]: value });

  const onDateChange = (value) => {
    let formattedDate = value;
    if (value.length === 2 || value.length === 5) {
      formattedDate += '/';
    }
    if (value.length <= 10) {
      onChange('dateOfBirth', formattedDate);
    }
  };

  const validateFields = () => {
    if (!firstName || !lastName || !dateOfBirth || !gender) {
      Alert.alert('Error', 'All fields are required.');
      return false;
    }
    const genderLowerCase = gender.toLowerCase();
    if (genderLowerCase !== 'male' && genderLowerCase !== 'female' && genderLowerCase !== 'other') {
      Alert.alert('Error', 'Gender must be Male, Female, or Other.');
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://192.168.1.128:5000/api/profile', formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log(res.data);
      Alert.alert('Success', 'Profile setup successful');
      navigation.navigate('Home');
    } catch (err) {
      console.error(err.response.data);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Your Profile</Text>
      <Input
        placeholder="First Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={firstName}
        onChangeText={(value) => onChange('firstName', value)}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Last Name"
        leftIcon={<Icon name="user" size={24} color="black" />}
        value={lastName}
        onChangeText={(value) => onChange('lastName', value)}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Date of Birth (MM/DD/YYYY)"
        leftIcon={<Icon name="calendar" size={24} color="black" />}
        value={dateOfBirth}
        onChangeText={onDateChange}
        keyboardType="numeric"
        inputStyle={styles.input}
      />
      <Input
        placeholder="Gender (Male, Female, or Other)"
        leftIcon={<Icon name="venus-mars" size={24} color="black" />}
        value={gender}
        onChangeText={(value) => onChange('gender', value)}
        inputStyle={styles.input}
      />
      <Button
        title="Submit"
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

export default ProfileSetup;
