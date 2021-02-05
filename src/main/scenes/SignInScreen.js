import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import { MyContext } from './util/Context';

export function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(MyContext);
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* to be changed for PROD*/}
        {/* <TouchableOpacity style={styles.buttonStyles} onPress={() => signIn({ username, password })}> */}
        <TouchableOpacity style={styles.buttonStyles} onPress={() => signIn({ username: "elisa.it.29@example.com", password: "14adc9" })}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonStyles: {
        backgroundColor: SECONDARY,
    },
    buttonText: {
        color: WHITE,
        fontWeight: FONT_WEIGHT_BOLD,
        fontSize: FONT_SIZE_HEADING
    }
  });