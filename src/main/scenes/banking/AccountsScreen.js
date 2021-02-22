import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from 'src/util/StorageHelper';
import { base_url, joinPath, getAccount, getBankIdsAndAccountIdsAndAccountTypes } from 'src/util/ObpApiUtils';
import { BLACK, GREEN_FOREST, GREEN_MINT, GREEN_PARIS, GREY_DARK, GREY_LIGHT, GREY_MEDIUM } from 'resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { accountsReducer, initialState } from 'src/scenes/banking/reducers/AccountsReducer.js';

export function AccountsScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [isAddButtonVisible, setAddButtonVisible] = useState(true);

  const handleScroll = (nativeEvent) => {
    if (isCloseToBottom(nativeEvent)) {
      setAddButtonVisible(false);
    }
  }

  const handleNoScroll = () => setAddButtonVisible(true);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const retrieveAccounts = () => {
    getAsyncStorage('obpToken')
    .then((token) => {
      getBankIdsAndAccountIdsAndAccountTypes(token)
      .then((bankIdsAndAccountIdsAndAccountTypes) => {
        const promises = []; // to store all returned promises
        bankIdsAndAccountIdsAndAccountTypes.bankIds.forEach(function (item, index) { // we use promises here to run asynchronous operations in parallel
          promises.push(getAccount(item, bankIdsAndAccountIdsAndAccountTypes.accountIds[index], bankIdsAndAccountIdsAndAccountTypes.accountTypes[index], token));
        }); 
        Promise.all(promises).then((listOfAccounts) => { // Promise.all() to collect results in order
          // only when all promises have been collected this is executed
          setAccounts(listOfAccounts);
          setLoading(false);
        });     
      });
    });
  }

  useEffect(() => {
    //S ubscribe for the focus listener to refresh the array of accounts whenever the screen is loaded
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed the accounts screen.');
      retrieveAccounts()
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          style={styles.accountsListContainer}
          data={accounts}
          keyExtractor={(item, index) => `list-item-${index}`}
          onScroll={({nativeEvent}) => handleScroll(nativeEvent)} // hide button to add account if we are at the bottom of screen
          onScrollEndDrag={handleNoScroll} // show button to add account
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
                <TouchableOpacity style={styles.payTransferButton} onPress={() =>
                  navigation.navigate('Make a payment', { 
                    screen: 'Make a payment', // this needs to be specifically stated to allow passing of params into nested navigator
                    params: {
                      fromAccount: item
                    }
                  })}>
                  <Text style={styles.payTransferButtonText}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.payTransferButton} onPress={() => 
                  navigation.navigate('Transfer between accounts', { 
                    screen: 'Transfer between accounts', // this needs to be specifically stated to allow passing of params into nested navigator
                    params: {
                      accountsList: accounts,
                      fromAccount: item
                    }
                  })}>
                  <Text style={styles.payTransferButtonText}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      )}
      {isAddButtonVisible && (
        <View style={styles.addAccountContainer}>
          <TouchableOpacity style={styles.addAccountButton} onPress={() => navigation.navigate('Add Account')}>
            <Text style={styles.addAccountButtonText}>Add Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: GREY_LIGHT,
      flex: 1,
      alignItems: 'center'
    },
    accountsListContainer: {
      width: '100%',
    },
    accountContainer: {
      alignSelf: 'center',
      width: '97%',
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