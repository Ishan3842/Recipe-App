import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Culinary Canvas!</Text>
      <Button
        title="Register"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Register')}
      />
      <Button
        title="Login"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
    marginVertical: 10,
    width: 200,
  },
});

export default Landing;
