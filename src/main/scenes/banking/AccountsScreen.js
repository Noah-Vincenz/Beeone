import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { MyContext } from '../util/Context';
import { GREEN_PARIS } from '../../resources/styles/colours';
import { FONT_WEIGHT_REGULAR } from '../../resources/styles/typography';

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
      <View style={styles.addAccountContainer}>
        <TouchableOpacity style={styles.addAccountButton} onPress={() => navigation.navigate('Add Account')}>
          <Text style={styles.addAccountButtonText}>Add Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addAccountContainer: {
      width: '100%',
      position:'absolute',
      bottom:0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addAccountButton: {
      width: '100%',
      padding: '2%',
      backgroundColor: GREEN_PARIS,
    },
    addAccountButtonText: {
      color: WHITE,
      textAlign: 'center',
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_HEADING
  },
});