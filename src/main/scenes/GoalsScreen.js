import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';
import { WHITE, SECONDARY, GREEN_PARIS, GREY_LIGHT } from 'resources/styles/colours'

export function GoalsScreen({ navigation }) {
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
    width: '100%',
    position:'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addCategoryButton: {
    width: '85%',
    padding: '1.5%',
    backgroundColor: GREEN_PARIS,
    borderRadius: 20,
    marginBottom: '1%'
  },
  addCategoryButtonText: { 
    color: WHITE,
    textAlign: 'center',
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_HEADING
  },
});