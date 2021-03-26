import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, Image, Icon } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName, getRealBankId } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_MEDIUM, GREY_EXTRA_LIGHT } from '../../resources/styles/colours';

export function DirectDebitsScreen({ route, navigation }) {
  const { fromAccount } = route.params;

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: GREY_EXTRA_LIGHT
    },
});