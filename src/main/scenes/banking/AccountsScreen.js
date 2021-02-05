import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { MyContext } from '../util/Context';

export function AccountsScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      fetch(joinPath(base_url, `/obp/v4.0.0/my/accounts`), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DirectLogin token="${token}"`
        },
      })
      .then((response) => response.json())
      .then((json) => setAccounts(json.accounts))
      .catch((error) => console.error(error))
      .finally(() => { setLoading(false) });
    })
  }, []);
  return (
    <View style={styles.container}>
      <Text>Your Accounts</Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          data={accounts}
          keyExtractor={(item, index) => `list-item-${index}`}
          renderItem={({item}) => <Text>{`${item.bank_id}: ${item.account_type}`}</Text>}
        />
      )}
      <TouchableOpacity style={styles.buttonStyles} onPress={() => navigation.navigate('Add Account')}>
        <Text style={styles.buttonText}>Add Account</Text>
      </TouchableOpacity>
    </View>
  );
};

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