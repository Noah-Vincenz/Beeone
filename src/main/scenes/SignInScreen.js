import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import { MyContext } from '../util/Context';
import { GREEN_MINT, GREEN_KELLY, GREEN_SACRAMENTO, GREEN_PARIS, GREY_DARK, GREY_LIGHT, GREY_MEDIUM, BLUE_MEDIUM, BLUE_DARK, GREEN_FOREST } from '../resources/styles/colours';
import { FONT_SIZE_STANDARD, FONT_SIZE_LOGO, FONT_SIZE_SMALL, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';

export function SignInScreen({ navigation }) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(MyContext);
  
    return (
      <View style={styles.container}>
        <Text style={styles.beeOne}>BeeOne</Text>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotButton}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* to be changed for PROD*/}
        {/* <TouchableOpacity style={styles.buttonStyles} onPress={() => signIn({ username, password })}> */}
        <TouchableOpacity style={styles.signInButton} onPress={() => signIn({ username: "nathan.fr.29@example.com", password: "bde179" })}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => signIn({ username: "nathan.fr.29@example.com", password: "bde179" })}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: GREY_LIGHT,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    beeOne:{
      color: GREEN_PARIS,
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_LOGO,
      marginBottom: '10%'
    },
    textInputView: {
      width: '80%',
      backgroundColor: GREEN_KELLY,
      borderRadius: 25,
      height: 50,
      marginBottom: '2%',
      justifyContent: "center",
      padding: '2%'
    },
    textInput: {
      color: GREEN_SACRAMENTO,
      fontSize: FONT_SIZE_STANDARD
    },
    forgotButton: {
      color: WHITE,
      fontSize: FONT_SIZE_SMALL,
      marginVertical: '2%'
    },
    buttonText: {
      color: WHITE,
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_HEADING,
      textAlign: 'center'
    },
    signInButton: {
      marginBottom: '2%',
      textAlign: 'center',
      padding: '2%',
      backgroundColor: GREEN_PARIS,
      width: '50%',
      borderRadius: 30,
    },
    signUpButton: {
      backgroundColor: GREY_MEDIUM,
      textAlign: 'center',
      padding: '2%',
      width: '50%',
      borderRadius: 30,
    },
    signUpButtonText: {
      color: GREY_DARK,
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD,
      textAlign: 'center',
    },
  });