import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, Image, Icon } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getTransactions } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName, getRealBankId } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_MEDIUM } from '../../resources/styles/colours';

export function TransactionsScreen({ route, navigation }) {
  const { fromAccount } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      getTransactions(fromAccount.bank_id, fromAccount.id, token)
      .then((transactionsReturned) => {
        setTransactions(transactionsReturned);
        setLoading(false);
      });
    })
    .catch((error) => console.error(error))
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList 
          style={styles.transactionsContainer}
          data={transactions}
          keyExtractor={(item, index) => `list-item-${index}`}
          renderItem={({item}) =>
            <View style={styles.transactionContainer}>
              <Text>{item.details.completed}</Text>
              <Text>{item.details.description}</Text>
              <Text>{item.details.new_balance.amount}</Text>
              <Text>{item.details.value.amount}</Text>
              <Text>{item.details.value.currency}</Text>
            </View>
          }
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
});