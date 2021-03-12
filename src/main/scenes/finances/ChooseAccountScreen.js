import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge } from '../../util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK, WHITE } from 'resources/styles/colours';
import { StackActions } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';

export function ChooseAccountScreen({ route, navigation }) {
    const { accountsList, fromAccount } = route.params;

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.accountsListContainer}
                data={accountsList.filter(item => item.id != fromAccount.id)}
                keyExtractor={(item, index) => `list-item-${index}`}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.accountContainer} onPress={() => { 
                        navigation.navigate('Transfer between accounts', {
                            accountsList: accountsList,
                            fromAccount: fromAccount,
                            toAccount: item
                        });
                    }}>
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
                    </TouchableOpacity>
                }
            /> 
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