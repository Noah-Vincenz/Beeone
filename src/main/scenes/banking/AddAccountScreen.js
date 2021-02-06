import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { GREY_LIGHT } from '../../resources/styles/colours';

export function AddAccountScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [banks, setBanks] = useState([]);

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
      .then((json) => setBanks(json.banks))
      .catch((error) => console.error(error))
      .finally(() => { setLoading(false) });
    })
  }, []);
  return (
    <View style={styles.container}>
        <Text>Select Bank</Text>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList 
            data={banks}
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