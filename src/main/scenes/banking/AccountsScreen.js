import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { MyContext } from '../util/Context';
import { GREEN_FOREST, GREEN_MINT, GREEN_PARIS, GREY_DARK, GREY_LIGHT, GREY_MEDIUM } from '../../resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD, FONT_WEIGHT_REGULAR } from '../../resources/styles/typography';

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
    // TODO: add /obp/v4.0.0/banks/BANK_ID/balances with bank id to get balances
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <View style={styles.accountsListContainer}>
          <FlatList 
            data={accounts}
            keyExtractor={(item, index) => `list-item-${index}`}
            renderItem={({item}) => 
              <View style={styles.accountContainer}>
                <View style={styles.accountContainerTop}>
                  <Image
                  style={styles.bankLogo}
                  source={require('../../resources/img/rbs-logo.png')}
                  />
                  <View style={styles.labelAndBankIdContainer}>
                    <Text style={styles.accountContainerTopText}>{`${item.label} (${item.bank_id})`}</Text>
                  </View>
                </View>
                <View style={styles.accountContainerMiddle}>
                  <Text style={styles.accountContainerMiddleText}>{item.account_type}</Text>
                  <Text style={styles.accountContainerMiddleText}>0 EUR</Text>
                </View>
                <View style={styles.accountContainerBottom}>
                  <TouchableOpacity style={styles.payTransferButton}>
                    <Text style={styles.payTransferButtonText}>Pay</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.payTransferButton}>
                    <Text style={styles.payTransferButtonText}>Transfer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </View>
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
      backgroundColor: GREY_LIGHT,
      flex: 1,
      alignItems: 'center',
    },
    accountsListContainer: {
      width: '95%',
      height: '90%'
    },
    accountContainer: {
      marginVertical: '1%',
      borderColor: GREY_MEDIUM,
      borderWidth: 1,
    },
    accountContainerTop: {
      flexDirection: 'row',
      backgroundColor: WHITE,
      padding: '1%'
    },
    bankLogo: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain'
    },
    labelAndBankIdContainer: {
      flex: 10
    },
    accountContainerMiddle: {
      backgroundColor: WHITE,
      alignItems: 'flex-start',
      padding: '1%'
    },
    accountContainerBottom: {
      backgroundColor: WHITE,
      flexDirection: 'row',
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
    payTransferButton: {
      flex: 1,
      padding: '2%',
      backgroundColor: WHITE,
      borderColor: GREY_MEDIUM,
      borderWidth: 0.5,
    },
    payTransferButtonText: {
      color: GREY_DARK,
      textAlign: 'center',
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD
    },
    accountContainerTopText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD,
      color: GREY_DARK
    },
    accountContainerMiddleText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_SMALL,
      color: GREY_DARK
    }
});