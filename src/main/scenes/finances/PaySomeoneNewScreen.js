import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableHighlight, Image, TextInput, Button } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge, getCounterParties } from 'src/util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK } from 'resources/styles/colours';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { BLACK, GREEN_FOREST, GREEN_KELLY, GREEN_MINT, GREEN_PARIS, GREEN_SACRAMENTO, WHITE } from 'resources/styles/colours';
import DropDownPicker from 'react-native-dropdown-picker';
import { createCounterParty } from '../../util/ObpApiUtils';

export function PaySomeoneNewScreen({ route, navigation }) {
    const { fromAccount } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [routingScheme, setRoutingScheme] = useState('IBAN');
    const [routingAddress, setRoutingAddress] = useState('');

    const onCreateButtonPressed = () => {
        getAsyncStorage('obpToken')
        .then((token) => {
            /*
            the below ensures that the call is made with an existing OBP account
            using this account:
            "email":"rob.us.29@example.com", "password":"a50eda", "bankid:"gh.29.us",
            "routingScheme": "IBAN", "routingAddress":"US12 1234 5123 4516 7274 2013 377",
            "accountid": "73a12430-136b-485d-934d-e51b0aa68de0", "currency": "USD", "amount": "7531.54" 
            */
            createCounterParty(fromAccount.bank_id, fromAccount.id, name, description, 'USD', 'IBAN', 'US12 1234 5123 4516 7274 2013 377', 'gh.29.us', token)
            // apply timeout to show updated account balances - unless transaction is taking longer than expected
            // we could add another API call here to check for the status of the transaction request
            setTimeout(navigation.goBack,
                250
            );
        })
    }

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
            <TouchableOpacity 
                style={name != undefined && description != undefined && routingScheme != undefined && routingAddress != undefined ? styles.createButtonEnabled
                    : styles.createButtonDisabled} 
                disabled={name == undefined || description == undefined || routingScheme == undefined || routingAddress == undefined} 
                onPress={onCreateButtonPressed}>
                <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
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
    },
    createButtonEnabled: {
        alignSelf: 'center',
        width: '85%',
        padding: '1.5%',
        backgroundColor: GREEN_PARIS,
        borderRadius: 20,
        marginVertical: '1%'
    },
    createButtonDisabled: {
        alignSelf: 'center',
        width: '85%',
        padding: '1.5%',
        backgroundColor: GREY_MEDIUM,
        borderRadius: 20,
        marginVertical: '1%'
    },
    createButtonText: {
        color: WHITE,
        textAlign: 'center',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_HEADING
    }
});