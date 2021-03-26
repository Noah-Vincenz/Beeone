import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, SectionList, Text, TextInput, View, TouchableOpacity, Image, Icon } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getTransactions } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName, getRealBankId } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_EXTRA_LIGHT, GREY_MEDIUM } from '../../resources/styles/colours';
import Moment from 'moment';

export function TransactionsScreen({ route, navigation }) {
  const { fromAccount } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      getTransactions(fromAccount.bank_id, fromAccount.id, token)
      .then((transactionsReturned) => {
        const groupedTxs = transactionsReturned.reduce((transactionsReturned, elem) => {   
          const titles = transactionsReturned.map(item => item.title);
          const elemDate = Moment(elem['details']['completed']).format('DD MMM YYYY').toString()
          if (titles.includes(elemDate)) {
            transactionsReturned.filter(item => item.title == elemDate)[0].data.push(elem);
          } else {
            transactionsReturned.push({
              title: elemDate, 
              data: [elem]
            });
          }
          return transactionsReturned;
        }, []);
        setTransactions(groupedTxs)
        setLoading(false);
      });
    })
    .catch((error) => console.error(error))
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <SectionList 
          style={styles.transactionsContainer}
          sections={transactions}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({section : { title }}) => (
            <View style={styles.headerContainer}>
              <Text style={[styles.dateHeader, styles.headerText]}>{title}</Text>
              <Text style={[styles.amountHeader, styles.headerText]}>Amount</Text>
              <Text style={[styles.balanceHeader, styles.headerText]}>Balance</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.detailsContainer}>
              <Text style={[styles.descriptionDetail, styles.detailsText]}>
                {item.other_account.holder.name === "" ? (
                  item.details.description // internal transfer between accounts
                ) : (
                  item.other_account.holder.name // external transfer
                )}
              </Text>
              <Text style={[styles.amountDetail, styles.detailsText]}>{item.details.value.amount}{getCurrencySymbol(item.details.value.currency)}</Text>
              <Text style={[styles.balanceDetail, styles.detailsText]}>{item.details.new_balance.amount}{getCurrencySymbol(item.details.new_balance.currency)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

function getCurrencySymbol(currency) {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'USD':
      return '$';
    case 'CHF':
      return 'CHf';
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: GREY_EXTRA_LIGHT
    },
    transactionsContainer: {
      width: '100%',
    },
    headerText: {
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR
    },
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      marginTop: '2%',
      paddingHorizontal: '1%',
    },
    dateHeader: {
      flex: 1.3,
      textAlign: 'left',
    },
    amountHeader: {
      flex: 1,
      textAlign: 'right',
    },
    balanceHeader: {
      flex: 1,
      textAlign: 'right',
    },
    detailsContainer: {
      flexDirection: 'row',
      borderColor: GREY_MEDIUM,
      borderWidth: 1,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      backgroundColor: WHITE,
      padding: '1%',
      paddingVertical: '3%'
    },
    detailsText: {
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR,
      color: GREY_DARK
    },
    descriptionDetail: {
      flex: 1.3,
      textAlign: 'left',
    },
    amountDetail: {
      flex: 1,
      textAlign: 'right',
    },
    balanceDetail: {
      flex: 1,
      textAlign: 'right',
    }
});