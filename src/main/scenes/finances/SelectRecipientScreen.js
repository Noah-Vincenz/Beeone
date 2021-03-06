import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge, getCounterParties, getAccountByRouting } from '../../util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK, WHITE, GREY_EXTRA_LIGHT } from 'resources/styles/colours';
import { StackActions } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { Icon } from 'react-native-elements';
import { selectRecipientReducer, initialState } from 'src/scenes/finances/reducers/SelectRecipientReducer.js';

export function SelectRecipientScreen({ route, navigation }) {
    const { fromAccount, counterParty } = route.params;
    const [state, dispatch] = useReducer(selectRecipientReducer, initialState);

    const retrieveCounterParties = () => {
        getAsyncStorage('obpToken')
        .then((token) => {
            getCounterParties(fromAccount.bank_id, fromAccount.id, token)
            .then((counterParties) => {
                dispatch({ type: 'LOAD_COUNTERPARTIES', counterParties: counterParties })
            });
        });
    }

    useEffect(() => {
        // Subscribe for the focus listener to refresh the array of accounts whenever the screen is loaded
        const unsubscribe = navigation.addListener('focus', () => {
            retrieveCounterParties()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.paySomeoneNewContainer} onPress={() => { 
                navigation.navigate('Pay someone new', {
                    fromAccount: fromAccount
                });
            }}>
                <Text style={styles.paySomeoneNewText}>Add new recipient</Text>
                <View style={styles.paySomeoneNewIcon}>
                    <Icon
                    name='chevron-right'
                    color={GREY_DARK}
                    size={35}
                    />
                </View>
            </TouchableOpacity>
            {state.isLoading ? <ActivityIndicator/> : (
                <FlatList 
                    style={styles.counterPartiesContainer}
                    data={state.counterParties}
                    keyExtractor={(item, index) => `list-item-${index}`}
                    renderItem={({item}) => 
                        <TouchableOpacity style={styles.counterPartyContainer} onPress={() => {
                            navigation.navigate('Make a payment', { 
                                screen: 'Make a payment', // this needs to be specifically stated to allow passing of params into nested navigator
                                counterParty: item,
                                params: {
                                    fromAccount: fromAccount
                                }
                            });
                            }}>
                            <View style={styles.counterPartyContainerTop}>
                                <Text style={styles.counterPartyContainerTopText}>{item.name} ({item.currency})</Text>
                            </View>
                            <View style={styles.counterPartyContainerMiddle}>
                                <Text style={styles.counterPartyContainerMiddleText}>{item.description}</Text>
                                <Text style={styles.counterPartyContainerMiddleText}>{item.other_account_routing_scheme} - {item.other_account_routing_address}</Text>
                                {item.other_account_secondary_routing_scheme != undefined && item.other_account_secondary_routing_scheme != "" && (
                                    <Text style={styles.counterPartyContainerMiddleText}>{item.other_account_secondary_routing_scheme} - {item.other_account_secondary_routing_address}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GREY_EXTRA_LIGHT,
        flex: 1,
        alignItems: 'center',
    },
    paySomeoneNewContainer: {
        backgroundColor: WHITE,
        alignSelf: 'center',
        width: '99.5%',
        margin: '0.5%',
        borderColor: GREY_MEDIUM,
        borderWidth: 1,
        borderTopWidth: 1.5,
        paddingVertical: '4%',
        paddingLeft: '2%',
        flexDirection: 'row'
    },
    paySomeoneNewText: {
        color: GREY_DARK
    },
    paySomeoneNewIcon: {
        alignSelf: 'center',
        position: 'absolute',
        right: 0
    },
    counterPartiesContainer: {
        width: '99.5%',
    },
    counterPartyContainer: {
        alignSelf: 'center',
        width: '100%',
        marginVertical: '0.5%',
        borderColor: GREY_MEDIUM,
        borderWidth: 1,
        borderTopWidth: 1.5,
    },
    counterPartyContainerTop: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        padding: '2%',
    },
    counterPartyContainerMiddle: {
        backgroundColor: WHITE,
        alignItems: 'flex-start',
        padding: '1%',
    },
    counterPartyContainerTopText: {
        color: GREY_DARK
    },
    counterPartyContainerMiddleText: {
        fontSize: FONT_SIZE_SMALL,
        color: GREY_DARK
    }
});