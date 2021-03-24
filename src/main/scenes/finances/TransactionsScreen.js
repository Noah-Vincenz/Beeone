import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, SectionList, Text, TextInput, View, TouchableOpacity, Image, Icon } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getTransactions } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName, getRealBankId } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_MEDIUM } from '../../resources/styles/colours';
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
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{title}</Text>
              <Text style={styles.dateText}>Amount</Text>
              <Text style={styles.dateText}>Balance</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.transactionContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.descriptionText}>{item.details.description}</Text>
                <Text style={styles.amountText}>{item.details.value.amount} ({item.details.value.currency})</Text>
                <Text style={styles.newBalanceText}>{item.details.new_balance.amount}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: GREY_LIGHT
    },
    transactionsContainer: {
      backgroundColor: GREY_LIGHT,
      width: '100%',
    },
    transactionContainer: {
      alignSelf: 'center',
      width: '97%',
      marginVertical: '1%',
      borderColor: GREY_MEDIUM,
      borderWidth: 1,
      borderTopWidth: 1.5,
    },
    dateContainer: {
      flexDirection: 'row'
    },
    dateText: {
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR
    },
    descriptionText: {
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR
    },
    amountText: {
      paddingLeft: '10%',
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR
    },
    detailsContainer: {
      flexDirection: 'row'
    },
    newBalanceText: {
      position: 'absolute',
      right: 0,
      fontSize: FONT_SIZE_STANDARD,
      fontWeight: FONT_WEIGHT_REGULAR
    }
});