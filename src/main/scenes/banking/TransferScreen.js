import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge } from '../../util/ObpApiUtils';
import { GREY_LIGHT } from '../../resources/styles/colours';
import { StackActions } from '@react-navigation/native';

export function TransferScreen({ route, navigation }) {
    const { bankId, accountId, accountsList } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonStyles} onPress={() => {
                navigation.navigate('Choose account', {
                    accountsList: accountsList
                });
                }}>
                <Text style={styles.buttonText}>To:</Text>
                <Text style={styles.buttonText}>Choose account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyles} onPress={() => transfer(bankId, accountId)}>
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

function transfer(bankId, accountId) {
    // TODO: add new screen 'Transfer between accounts' that allows you to pick account and pick amount
    const recipientBankId = "hsbc-test"
    const recipientAccountId = "pavan_k"
    getAsyncStorage('obpToken')
    .then((token) => {
        getChallengeTypes(bankId, accountId, token)
        .then((challengeTypes) => {
          const challengeType = challengeTypes[0]
          initiateTransactionRequest(bankId, accountId, recipientBankId, recipientAccountId, challengeType, token)
          .then((initiateResponse) => {
            if(initiateResponse.code != null && initiateResponse.code == 400 || initiateResponse.code == 404) {
              console.error(initiateResponse)
            }
            else if (initiateResponse.challenges != null) {
                // answer the challenge
                const challengeQuery = initiateResponse.challenges[0].id
                const transactionReqId = initiateResponse.id
    
                const challengeResponse = answerChallenge(bankId, accountId, transactionReqId, challengeQuery) 
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GREY_LIGHT
    },
    buttonStyles: {
      backgroundColor: SECONDARY,
    },
    buttonText: {
        color: WHITE,
        fontWeight: FONT_WEIGHT_BOLD,
        fontSize: FONT_SIZE_HEADING
    }
});