import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { addAccountReducer, initialState } from 'src/scenes/finances/reducers/AddAccountReducer.js';

export function AddAccountScreen({ navigation }) {

  const [state, dispatch] = useReducer(addAccountReducer, initialState);

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      fetch(joinPath(base_url, '/obp/v4.0.0/banks'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DirectLogin token="${token}"`
        },
      })
      .then((response) => response.json())
      .then((json) => dispatch({ type: 'LOAD_BANKS', banks: json.banks }))
      .catch((error) => console.error(error))
    })
  }, []);
  return (
    <View style={styles.container}>
        <Text>Select Bank</Text>
        {state.isLoading ? <ActivityIndicator/> : (
            <FlatList 
            data={state.banks}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({item}) => <Text>{item.short_name}</Text>}
            />
        )}
        <TouchableOpacity style={styles.buttonStyles}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GREY_LIGHT
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