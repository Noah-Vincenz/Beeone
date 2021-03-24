import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';
import { WHITE, SECONDARY, GREEN_PARIS } from 'resources/styles/colours'
import { GREY_LIGHT, GREY_EXTRA_LIGHT } from 'resources/styles/colours';

export function ImpactScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text>...my impact</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: GREY_EXTRA_LIGHT,
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});