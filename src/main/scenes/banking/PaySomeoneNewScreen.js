import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import { WHITE, SECONDARY } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge, getCounterParties } from '../../util/ObpApiUtils';
import { GREY_LIGHT, GREY_MEDIUM, GREY_DARK } from 'resources/styles/colours';
import { StackActions, useNavigation } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { GREEN_KELLY, GREEN_SACRAMENTO } from '../../resources/styles/colours';

export function PaySomeoneNewScreen({ route }) {
    const { fromAccount } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [counterParties, setCounterParties] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [currency, setCurrency] = useState('');
    const [routingScheme, setRoutingScheme] = useState('');
    const [routingAddress, setRoutingAddress] = useState('');

    // const navigation = useNavigation();
    // navigation.setOptions({
    //     headerRight: () => (
    //         <Button title="Create" onPress={() => navigation.navigate('Select recipient')} />
    //     ),
    // });
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
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder="Currency"
                    value={currency}
                    onChangeText={setCurrency}
                />
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder="Routing Scheme"
                    value={routingScheme}
                    onChangeText={setRoutingScheme}
                />
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    placeholder="Routing Address"
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
    },
    textInputView: {
        width: '80%',
        backgroundColor: GREEN_KELLY,
        borderRadius: 25,
        height: 50,
        marginBottom: '2%',
        justifyContent: "center",
        padding: '2%'
    },
    textInput: {
        color: GREEN_SACRAMENTO,
        fontSize: FONT_SIZE_STANDARD
    },
});