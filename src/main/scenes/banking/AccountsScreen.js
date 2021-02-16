import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { MyContext } from '../util/Context';
import { BLACK, GREEN_FOREST, GREEN_MINT, GREEN_PARIS, GREY_DARK, GREY_LIGHT, GREY_MEDIUM } from '../../resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD, FONT_WEIGHT_REGULAR } from '../../resources/styles/typography';

function getLogoSourcePath(bankId) {
  switch (bankId) {
    case 'rbs': return require('../../resources/img/rbs-logo.png');
    case 'hsbc-test': return require('../../resources/img/hsbc-logo.png');
    case 'testowy_bank_id': return require('../../resources/img/db-logo.png');
    default: return require('../../resources/img/rbs-logo.png');
  }
}

const getBankAndAccountIds = async (token) => {
  let response = await fetch(joinPath(base_url, `/obp/v4.0.0/my/accounts`), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `DirectLogin token="${token}"`
    },
  })
  let json = await response.json();
  const bankIds = json.accounts.map(x => x.bank_id) // return array of account ids
  const accountIds = json.accounts.map(x => x.id) // return array of account ids
  return {bankIds, accountIds}
}

function getAccount(bankId, accountId, listOfAccounts, token) {
  return new Promise(resolve => {
    fetch(joinPath(base_url, `/obp/v4.0.0/my/banks/${bankId}/accounts/${accountId}/account`), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `DirectLogin token="${token}"`
      },
    })
    .then((response) => response.json())
    .then((json) => {
      listOfAccounts.push(json);
      resolve(json);
    })
    .catch((error) => {
      console.error(error);
    });
  });
}

export function AccountsScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      getBankAndAccountIds(token)
      .then((accounts) => {
        const promises = []; // to store all returned promises
        const listOfAccounts = []
        accounts.bankIds.forEach(function (item, index) {
          promises.push(getAccount(accounts.bankIds[index], accounts.accountIds[index], listOfAccounts, token));
        });
        Promise.all(promises).then(() => {
          // only when all promises have been collected this is executed
          setAccounts(listOfAccounts);
          setLoading(false);
        });     
      })
      .catch((error) => console.error(error))
    })
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
                  source={getLogoSourcePath(item.bank_id)}
                  />
                  <View style={styles.labelAndBankIdContainer}>
                    <Text style={styles.accountContainerTopText}>{item.label} ({item.bank_id})</Text>
                  </View>
                </View>
                <View style={styles.accountContainerMiddle}>
                  <Text style={styles.accountContainerMiddleText}>{item.account_type}</Text>
                  <Text style={styles.accountContainerMiddleText}>{item.balance.amount} ({item.balance.currency})</Text>
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
      borderTopWidth: 1.5,
    },
    accountContainerTop: {
      flexDirection: 'row',
      backgroundColor: WHITE,
      padding: '2%',
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
      padding: '1%',
    },
    accountContainerBottom: {
      backgroundColor: WHITE,
      flexDirection: 'row',
    },
    addAccountContainer: {
      width: '100%',
      position:'absolute',
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addAccountButton: {
      width: '85%',
      padding: '1.5%',
      backgroundColor: GREEN_PARIS,
      borderRadius: 20,
      marginBottom: '1%'
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