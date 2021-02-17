import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import { StackActions } from '@react-navigation/native';
import { MyContext } from '../util/Context';
import { NavigationActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { ALERT, GREEN_KELLY, GREEN_MINT, GREEN_PARIS, GREY_LIGHT, GREY_MEDIUM } from '../resources/styles/colours';

export function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(MyContext);

  return (
    <View style={styles.parentContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate('News Feed')}>
            <Text style={styles.buttonText}>My News Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate('Banking')}>
            <Text style={styles.buttonText}>My Banking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate('Documents')}>
            <Text style={styles.buttonText}>My Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.screenButton} onPress={() => navigation.navigate('Marketplace')}>
            <Text style={styles.buttonText}>My Marketplace</Text>
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
  screenButton: {
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