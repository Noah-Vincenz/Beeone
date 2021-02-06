import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';
import { WHITE, SECONDARY, GREEN_PARIS } from 'resources/styles/colours'
import { GREY_LIGHT } from '../../resources/styles/colours';

export function SpendingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>...showing 210EUR on shopping, 300EUR on rent</Text>
      </View>
      <View style={styles.addCategoryContainer}>
        <TouchableOpacity style={styles.addCategoryButton} onPress={() => navigation.navigate('Add Category')}>
          <Text style={styles.addCategoryButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: GREY_LIGHT,
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCategoryContainer: {
    position:'absolute',
    bottom:0,
    width: '100%',
  },
  addCategoryButton: {
    width: '100%',
    padding: '2%',
    backgroundColor: GREEN_PARIS,
  },
  addCategoryButtonText: { 
    color: WHITE,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_HEADING
  },
});