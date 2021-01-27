import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'

export function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('MyNewsFeedScreen')}>
            <Text style={styles.buttonText}>My News Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('MyBankingScreen')}>
            <Text style={styles.buttonText}>My Banking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('MyDocumentsScreen')}>
            <Text style={styles.buttonText}>My Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('MyMarketplaceScreen')}>
            <Text style={styles.buttonText}>My Marketplace</Text>
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