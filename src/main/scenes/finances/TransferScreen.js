import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from 'src/util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge } from 'src/util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK, GREEN_PARIS, WHITE } from 'resources/styles/colours';
import { StackActions } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils'

export function TransferScreen({ route, navigation }) {
    const { accountsList, fromAccount, toAccount } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.accountsListContainer}>
                <View style={styles.accountContainer}>
                    <View style={styles.accountContainerTop}>
                        <Image
                            style={styles.bankLogo}
                            source={getLogoSourcePath(fromAccount.bank_id)}
                        />
                        <View style={styles.labelAndBankIdContainer}>
                            <Text style={styles.accountContainerTopText}>{fromAccount.label} ({fromAccount.bank_id})</Text>
                        </View>
                    </View>
                    <View style={styles.accountContainerMiddle}>
                        <Text style={styles.accountContainerMiddleText}>{fromAccount.account_type}</Text>
                        <Text style={styles.accountContainerMiddleText}>{fromAccount.balance.amount} ({fromAccount.balance.currency})</Text>
                    </View>
                </View>
            </View>
            {toAccount == null ? (
                <TouchableOpacity style={styles.accountContainer} onPress={() => {
                    navigation.navigate('Choose account', {
                        accountsList: accountsList,
                        fromAccount: fromAccount
                    });
                    }}>
                    <View style={styles.accountContainerTop}>
                        <View style={styles.labelAndBankIdContainer}>
                            <Text style={styles.accountContainerTopText}>To:</Text>
                        </View>
                    </View>
                    <View style={styles.accountContainerMiddle}>
                        <Text style={styles.accountContainerMiddleText}>Choose Account</Text>
                        <Text style={styles.accountContainerMiddleText}></Text>
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.accountContainer} onPress={() => { 
                    navigation.navigate('Choose account', {
                        accountsList: accountsList,
                        fromAccount: fromAccount
                    });
                    }}>
                    <View style={styles.accountContainerTop}>
                        <Image
                            style={styles.bankLogo}
                            source={getLogoSourcePath(toAccount.bank_id)}
                        />
                        <View style={styles.labelAndBankIdContainer}>
                            <Text style={styles.accountContainerTopText}>{toAccount.label} ({toAccount.bank_id})</Text>
                        </View>
                    </View>
                    <View style={styles.accountContainerMiddle}>
                        <Text style={styles.accountContainerMiddleText}>{toAccount.account_type}</Text>
                        <Text style={styles.accountContainerMiddleText}>{toAccount.balance.amount} ({toAccount.balance.currency})</Text>
                    </View>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.doneButton} onPress={() => {
                if (toAccount != null) { 
                    transfer(fromAccount.bank_id, fromAccount.id, toAccount.bank_id, toAccount.id);
                    // apply timeout to show updated account balances - unless transfer is taking longer than expected
                    // we could add another API call here to check for the status of the transaction request
                    setTimeout(navigation.goBack,
                        250
                    );
                }
            }}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

function transfer(fromBankId, fromAccountId, toBankId, toAccountId) {
    getAsyncStorage('obpToken')
    .then((token) => {
        getChallengeTypes(fromBankId, fromAccountId, token)
        .then((challengeTypes) => {
          const challengeType = challengeTypes[0]
          initiateTransactionRequest(fromBankId, fromAccountId, toBankId, toAccountId, challengeType, token)
          .then((initiateResponse) => {
            if(initiateResponse.code != null && initiateResponse.code == 400 || initiateResponse.code == 404) {
              console.error(initiateResponse)
            }
            else if (initiateResponse.challenges != null) {
                // answer the challenge
                const challengeQuery = initiateResponse.challenges[0].id
                const transactionReqId = initiateResponse.id
    
                const challengeResponse = answerChallenge(fromBankId, fromAccountId, transactionReqId, challengeQuery) 
                if("error" in challengeResponse) {
                    console.error(challengeResponse)
                }
                console.log(`Transaction status: ${challengeResponse.status}`);
                console.log(`Transaction created: ${challengeResponse.transaction_ids}`);
            }
            else {
                // There was no challenge, transaction was created immediately
                console.log("Transaction was successfully created:")
                console.log(initiateResponse)
            }
          });
        });
    })
    .catch((error) => console.error(error));
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GREY_LIGHT,
        flex: 1,
        alignItems: 'center',
    },
    accountsListContainer: {
        width: '100%',
    },
    accountContainer: {
        alignSelf: 'center',
        width: '97%',
        marginVertical: '0.5%',
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
    doneButton: {
        width: '85%',
        padding: '1.5%',
        backgroundColor: GREEN_PARIS,
        borderRadius: 20,
        marginVertical: '1%'
    },
    doneButtonText: {
        color: WHITE,
        textAlign: 'center',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_HEADING
    },
});