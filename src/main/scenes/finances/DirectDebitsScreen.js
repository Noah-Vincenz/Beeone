import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, Image, Icon } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName, getRealBankId } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_MEDIUM } from '../../resources/styles/colours';

export function DirectDebitsScreen({ route, navigation }) {
  const { fromAccount } = route.params;

  // TODO: Transactions, Direct Debits, Standing Orders

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <View style={styles.accountContainerTop}>
          <Image
          style={styles.bankLogo}
          source={getLogoSourcePath(fromAccount.bank_id)}
          />
          <View style={styles.labelAndBankIdContainer}>
            <Text style={styles.accountContainerTopText}>{fromAccount.label} ({getRealBankId(fromAccount.bank_id)})</Text>
          </View>
        </View>
        <View style={styles.accountContainerMiddle}>
          {fromAccount.account_routings.length > 0 && ( 
            <Text style={styles.accountContainerMiddleText}>{fromAccount.account_routings[0].scheme} - {fromAccount.account_routings[0].address}</Text>
          )}
          {fromAccount.account_routings.length > 1 && (
            <Text style={styles.accountContainerMiddleText}>{fromAccount.account_routings[1].scheme} - {fromAccount.account_routings[1].address}</Text>
          )}
          <Text style={styles.accountContainerMiddleText}>{fromAccount.account_type}</Text>
          <Text style={styles.accountContainerMiddleText}>{fromAccount.balance.amount} ({fromAccount.balance.currency})</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.paySomeoneNewContainer} onPress={() => { 
        navigation.navigate('Transactions', {
          fromAccount: fromAccount
        });
      }}>
        <Text style={styles.buttonText}>Transactions</Text>
        <View style={styles.buttonIcon}>
            <Icon
            name='chevron-right'
            color={GREY_DARK}
            size={35}
            />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paySomeoneNewContainer} onPress={() => { 
        navigation.navigate('Standing Orders', {
          fromAccount: fromAccount
        });
      }}>
        <Text style={styles.buttonText}>Standing Orders</Text>
        <View style={styles.buttonIcon}>
            <Icon
            name='chevron-right'
            color={GREY_DARK}
            size={35}
            />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paySomeoneNewContainer} onPress={() => { 
        navigation.navigate('Direct Debits', {
          fromAccount: fromAccount
        });
      }}>
        <Text style={styles.buttonText}>Direct Debits</Text>
        <View style={styles.buttonIcon}>
            <Icon
            name='chevron-right'
            color={GREY_DARK}
            size={35}
            />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: GREY_LIGHT
    },
    accountsContainer: {
      backgroundColor: GREY_LIGHT,
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
    accountContainerTopText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD,
      color: GREY_DARK
    },
    accountContainerMiddleText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_SMALL,
      color: GREY_DARK
    },
    buttonText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD,
      color: GREY_DARK
    },
    buttonIcon: {
      alignSelf: 'center',
      position: 'absolute',
      right: 0
    },
});