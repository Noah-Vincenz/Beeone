import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableHighlight, Image, TextInput, Button } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge, getCounterParties } from '../../util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK } from 'resources/styles/colours';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { BLACK, GREEN_FOREST, GREEN_KELLY, GREEN_MINT, GREEN_PARIS, GREEN_SACRAMENTO } from '../../resources/styles/colours';
import DropDownPicker from 'react-native-dropdown-picker';

export function PaySomeoneNewScreen({ route }) {
    const { fromAccount } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [routingScheme, setRoutingScheme] = useState('IBAN');
    const [routingAddress, setRoutingAddress] = useState('');

    /**
     * TODO: 
     * make request to /obp/v4.0.0/banks/BANK_ID/accounts/ACCOUNT_ID/VIEW_ID/counterparties
     * with body {  "name":"CounterpartyName",  "description":"My landlord",  "currency":"EUR",  "other_account_routing_scheme":"OBP",  "other_account_routing_address":"36f8a9e6-c2b1-407a-8bd0-421b7119307e",  "other_account_secondary_routing_scheme":"IBAN",  "other_account_secondary_routing_address":"DE89370400440532013000",  "other_bank_routing_scheme":"OBP",  "other_bank_routing_address":"gh.29.uk",  "other_branch_routing_scheme":"OBP",  "other_branch_routing_address":"12f8a9e6-c2b1-407a-8bd0-421b7119307e",  "is_beneficiary":true,  "bespoke":[{    "key":"englishName",    "value":"english Name"  }]}
     */
    return (
        <View style={styles.container}>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.currencyContainer}>
                <Text style={styles.currencyText}>Currency:</Text>
                <DropDownPicker
                    items={[
                        {label: 'EUR - Euro', value: 'EUR', textStyle: styles.itemText},
                        {label: 'CHF - Swiss franc', value: 'CHF', textStyle: styles.itemText},
                        {label: 'GBP - British pound', value: 'GBP', textStyle: styles.itemText},
                    ]}
                    defaultValue={'EUR'}
                    containerStyle={styles.currencyDropDown}
                    itemStyle={styles.dropDownItem}
                    labelStyle={styles.dropDownLabel}
                    onChangeItem={item => setCurrency(item)}
                />
            </View>
            <View style={styles.toggleGroup}>
                {routingScheme == 'IBAN' ? (
                    <TouchableOpacity style={styles.toggleButtonPressed} onPress={() => { setRoutingScheme('IBAN') }}>
                        <Text style={styles.toggleButtonTextPressed}>IBAN</Text>
                    </TouchableOpacity>   
                ) : (
                    <TouchableOpacity style={styles.toggleButtonNormal} onPress={() => { setRoutingScheme('IBAN') }}>
                        <Text style={styles.toggleButtonTextNormal}>IBAN</Text>
                    </TouchableOpacity>  
                )}   
                {routingScheme == 'Account Number' ? (
                    <TouchableOpacity style={styles.toggleButtonPressed} onPress={() => { setRoutingScheme('Account Number') }}>
                        <Text style={styles.toggleButtonTextPressed}>Account Number</Text>
                    </TouchableOpacity>   
                ) : (
                    <TouchableOpacity style={styles.toggleButtonNormal} onPress={() => { setRoutingScheme('Account Number') }}>
                        <Text style={styles.toggleButtonTextNormal}>Account Number</Text>
                    </TouchableOpacity>  
                )}          
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder={routingScheme}
                    value={routingAddress}
                    onChangeText={setRoutingAddress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: GREY_LIGHT,
        flex: 1,
        alignItems: 'center',
        paddingTop: '2%'
    },
    textInputView: {
        borderRadius: 5,
        width: '95%',
        backgroundColor: WHITE,
        height: 50,
        marginBottom: '2%',
        justifyContent: "center",
        padding: '2%'
    },
    textInput: {
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_STANDARD,
        color: GREY_DARK,
    },
    currencyContainer: {
        height: 70,
        width: '95%',
        marginBottom: '2%',
        zIndex: 1
    },
    currencyText: {
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_SMALL,
        color: GREY_DARK
    },
    currencyDropDown: {
        height: 50,
    },
    dropDownItem: {
        justifyContent: 'flex-start',
    },
    dropDownLabel: {
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_SMALL,
        color: GREY_DARK
    },
    toggleGroup: {
        backgroundColor: WHITE,
        borderColor: GREEN_SACRAMENTO,
        borderRadius: 15,
        borderWidth: 0.5,
        height: 30,
        flexDirection: 'row',
        width: '95%',
        marginBottom: '2%',
    },
    toggleButtonNormal: {
        flex: 1,
        justifyContent: 'center',
    },
    toggleButtonPressed: {
        flex: 1,
        backgroundColor: GREEN_PARIS,
        borderColor: GREEN_SACRAMENTO,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
    },
    toggleButtonTextNormal: {
        alignSelf: 'center',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_SMALL,
        color: GREY_DARK
    },
    toggleButtonTextPressed: {
        alignSelf: 'center',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_SMALL,
        color: WHITE
    }
});