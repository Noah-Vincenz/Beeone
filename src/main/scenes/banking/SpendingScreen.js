import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'

export function SpendingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Spending Screen</Text>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('Add Category')}>
        <Text style={styles.buttonText}>Add Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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