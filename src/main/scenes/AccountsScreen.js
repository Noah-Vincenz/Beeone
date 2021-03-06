import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from 'src/util/StorageHelper';
import { base_url, joinPath, getAccount, getBankIdsAndAccountIdsAndAccountTypesAndRoutings } from 'src/util/ObpApiUtils';
import { BLACK, GREEN_FOREST, GREEN_MINT, GREEN_PARIS, GREY_DARK, GREY_LIGHT, GREY_MEDIUM, GREY_EXTRA_LIGHT } from 'resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD, FONT_WEIGHT_REGULAR } from 'resources/styles/typography';
import { getLogoSourcePath, getRealBankId } from 'src/util/AccountUtils';
import { accountsReducer, initialState } from 'src/scenes/finances/reducers/AccountsReducer.js';

export function AccountsScreen({ navigation }) {
  const [state, dispatch] = useReducer(accountsReducer, initialState);
  // const [isAddButtonVisible, setAddButtonVisible] = useState(true);
  // const handleScroll = (nativeEvent) => {
  //   if (isCloseToBottom(nativeEvent)) {
  //     setAddButtonVisible(false);
  //   }
  // }

  // const handleNoScroll = () => setAddButtonVisible(true);

  // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  //   const paddingToBottom = 20;
  //   return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  // };

  const retrieveAccounts = () => {
    getAsyncStorage('obpToken')
    .then((token) => {
      getBankIdsAndAccountIdsAndAccountTypesAndRoutings(token)
      .then((bankIdsAndAccountIdsAndAccountTypesAndRoutings) => {
        const promises = []; // to store all returned promises
        bankIdsAndAccountIdsAndAccountTypesAndRoutings.bankIds.forEach(function (item, index) { // we use promises here to run asynchronous operations in parallel
          const acc = getAccount(item, bankIdsAndAccountIdsAndAccountTypesAndRoutings.accountIds[index], bankIdsAndAccountIdsAndAccountTypesAndRoutings.accountTypes[index], bankIdsAndAccountIdsAndAccountTypesAndRoutings.accountRoutings[index], token)
          promises.push(acc);
        }); 
        Promise.all(promises).then((listOfAccounts) => { // Promise.all() to collect results in order
          // only when all promises have been collected this is executed
          dispatch({ type: 'LOAD_ACCOUNTS', listOfAccounts: listOfAccounts }); // sets loading to false and sets accounts
        });     
      });
    });
  }

  useEffect(() => {
    // Subscribe for the focus listener to refresh the array of accounts whenever the screen is loaded
    const unsubscribe = navigation.addListener('focus', () => {
      retrieveAccounts()
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {state.isLoading ? <ActivityIndicator/> : (
        <FlatList 
          style={styles.accountsListContainer}
          data={state.accounts}
          keyExtractor={(item, index) => `list-item-${index}`}
          // onScroll={({nativeEvent}) => handleScroll(nativeEvent)} // hide button to add account if we are at the bottom of screen
          // onScrollEndDrag={handleNoScroll} // show button to add account
          renderItem={({item}) => 
            <View style={styles.accountContainer}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Account Information', { 
                  fromAccount: item
                })}}>
                <View style={styles.accountContainerTop}>
                  <Image
                  style={styles.bankLogo}
                  source={getLogoSourcePath(item.bank_id)}
                  />
                  <View style={styles.labelAndBankIdContainer}>
                    <Text style={styles.accountContainerTopText}>{item.label} ({getRealBankId(item.bank_id)})</Text>
                  </View>
                </View>
                <View style={styles.accountContainerMiddle}>
                  <Text style={styles.accountContainerMiddleText}>{item.account_type}</Text>
                  <Text style={styles.accountContainerMiddleText}>{item.balance.amount} ({item.balance.currency})</Text>
                </View>
              </TouchableOpacity>
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
                      accountsList: state.accounts,
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
      {/* {isAddButtonVisible && ( */}
      <View style={styles.addAccountContainer}>
        <TouchableOpacity style={styles.addAccountButton} onPress={() => navigation.navigate('Add Account')}>
          <Text style={styles.addAccountButtonText}>Add Account</Text>
        </TouchableOpacity>
      </View>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: GREY_EXTRA_LIGHT,
      flex: 1,
      alignItems: 'center'
    },
    accountsListContainer: {
      width: '100%',
      paddingBottom: '20%'
    },
    accountContainer: {
      alignSelf: 'center',
      width: '97%',
      marginVertical: '1%',
      borderColor: GREY_DARK,
      borderWidth: 1,
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
      resizeMode: 'contain',
      marginRight: '1%'
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
      fontSize: FONT_SIZE_HEADING
    },
    payTransferButton: {
      flex: 1,
      padding: '2%',
      backgroundColor: WHITE,
      borderColor: GREY_MEDIUM,
      borderWidth: 1,
      borderBottomWidth: 0
    },
    payTransferButtonText: {
      color: GREY_DARK,
      textAlign: 'center',
    },
    accountContainerTopText: {
      color: GREY_DARK
    },
    accountContainerMiddleText: {
      fontSize: FONT_SIZE_SMALL,
      color: GREY_DARK
    }
});