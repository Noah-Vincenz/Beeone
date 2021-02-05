import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import { StackActions } from '@react-navigation/native';
import { MyContext } from './util/Context';
import { NavigationActions, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';

export function HomeScreen({ navigation }) {
  const { signOut } = React.useContext(MyContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('News Feed')}>
          <Text style={styles.buttonText}>My News Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('Banking')}>
          <Text style={styles.buttonText}>My Banking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('Documents')}>
          <Text style={styles.buttonText}>My Documents</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('Marketplace')}>
          <Text style={styles.buttonText}>My Marketplace</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyles} onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
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