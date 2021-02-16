import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { GREY_LIGHT } from '../../resources/styles/colours';

export function TransferScreen({ route, navigation }) {
    const { bankId, accountId } = route.params;

    return (
        <View style={styles.container}>
            <Text>Transfer between accounts</Text>
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
    });
}
  
const answerChallenge = async (bankId, accountId, transactionReqId, challengeQuery) => {
    let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/transaction-request-types/sandbox/transaction-requests/${transactionReqId}/challenge`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `DirectLogin token="${token}"`
      },
      body: JSON.stringify({
        id: challengeQuery,
        answer: 123456
      })
    });
    let json = await response.json();
    return json
}
  
const getChallengeTypes = async (bankId, accountId, token) => {
    let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${bankId}/accounts/${accountId}/owner/transaction-request-types`), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DirectLogin token="${token}"`
        }
    });
    let json = await response.json();
    console.log(`json ${JSON.stringify(json)}`)
    const types = json.transaction_request_types
    const res = []
    types.forEach(function (type, index) {
      res.push(type.value)
    });
    return res
}
  
const initiateTransactionRequest = async (senderBankId, senderAccountId, recipientBankId, recipientAccountId, challengeType, token) => {
    let response = await fetch(joinPath(base_url, `/obp/v4.0.0/banks/${senderBankId}/accounts/${senderAccountId}/owner/transaction-request-types/${challengeType}/transaction-requests`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DirectLogin token="${token}"`
        },
        body: JSON.stringify({
            to: {
                account_id: recipientAccountId,
                bank_id: recipientBankId
            },
            value: {
                currency: 'EUR',
                amount: '10'
            },
            description: "Rent",
            challenge_type: challengeType
        })
    })
    let json = await response.json();
    return json
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