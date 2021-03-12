import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { StackActions } from '@react-navigation/native';
import { MyContext } from '../util/Context';
import { NavigationActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { ALERT, GREEN_KELLY, GREEN_MINT, GREEN_PARIS, GREY_LIGHT, GREY_MEDIUM, WHITE } from 'resources/styles/colours';

export function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const { signOut } = React.useContext(MyContext);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.postContainer}> 
          <TextInput style={styles.textInput}
            placeholder="What would you like to share?"
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.buttonText}>Add a photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer:{
    backgroundColor: GREY_LIGHT,
    flex: 1,
  },
  mainContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postContainer:{
    borderRadius: 5,
    width: '95%',
    backgroundColor: WHITE,
    height: 50,
    marginBottom: '2%',
    justifyContent: "center",
    padding: '2%'
  },
  addPhotoButton: {
      backgroundColor: GREEN_PARIS,
      marginVertical: '2%',
      height: '15%',
      width: '100%',
      justifyContent: 'center',
  },
  signOutContainer:{
    width: '100%',
    position:'absolute',
    bottom:0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signOutButton: {
    marginBottom: '10%',
    padding: '2%',
    backgroundColor: GREY_MEDIUM,
    width: '50%',
    borderRadius: 30,
  },
  buttonText: {
      textAlign: 'center',
      color: WHITE,
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_HEADING
  }
});