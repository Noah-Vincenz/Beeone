import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_STANDARD_LARGE, FONT_SIZE_SMALL } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from 'src/util/StorageHelper';
import { base_url, joinPath, getChallengeTypes, initiateTransactionRequest, answerChallenge } from 'src/util/ObpApiUtils';
import { GREY_LIGHT, BLACK, GREY_MEDIUM, GREY_DARK, GREEN_PARIS, WHITE, GREEN_SACRAMENTO } from 'resources/styles/colours';
import { StackActions } from '@react-navigation/native';
import { getLogoSourcePath } from 'src/util/AccountUtils';
import { RadioButton } from 'src/model/RadioButton.js';
import Picker from '@gregfrench/react-native-wheel-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

var PickerItem = Picker.Item;

export function TransferScreen({ route, navigation }) {
    const { accountsList, fromAccount, toAccount } = route.params;
    const [amount, setAmount] = useState('');
    const [transferType, setTransferType] = useState('');
    const [transferTypeList, setTransferTypeList] = useState([
        { id: 1, name: "One Off Payment", selected: true },
        { id: 2, name: "Standing Order", selected: false }
    ]);
    const [frequency, setFrequency ] = useState(0); // default is 'Daily'
    const [frequencyList , setFrequencyList ] = useState([
        'Daily', 'Bi-Weekly', 'Weekly', 'Monthly', 'Yearly'
    ]);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);
  
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };

    const updateShowDatePicker = () => {
        setShowDatePicker (showDatePicker ? false : true);
    };

    const updateShowFrequencyPicker = () => {
        setShowFrequencyPicker (showFrequencyPicker ? false : true);
    };
  
    const onRadioBtnClick = (item) => {
        let updatedState = transferTypeList.map((it) =>
        it.id === item.id
            ? { ...it, selected: true }
            : { ...it, selected: false }
        );
        setTransferTypeList(updatedState);
        setTransferType(item.name);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                <View style={styles.amountContainer}>
                    <Text style={styles.inputViewText}>Amount</Text>
                    <TextInput style={styles.inputViewTextInput}
                        keyboardType = 'numeric'
                        placeholder = '0'
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>
                <View style={styles.standingOrderContainer}>
                    {transferTypeList.map((item) => (
                        <RadioButton
                            onPress={() => onRadioBtnClick(item)}
                            selected={item.selected}
                            key={item.id}
                        >
                        {item.name}
                        </RadioButton>
                    ))}
                    {transferType == 'Standing Order' && (
                        <View>
                            <TouchableOpacity onPress={() => {updateShowFrequencyPicker()}}>
                                <Text style={styles.inputViewText}>Frequency</Text>
                                <Text style={styles.inputViewTextInput}>{frequencyList[frequency]}</Text>
                            </TouchableOpacity>
                            {showFrequencyPicker && (
                                <Picker style={styles.frequencyPicker}
                                    lineColor="#000000" //to set top and bottom line color (Without gradients)
                                    lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
                                    lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
                                    selectedValue={frequency}
                                    itemStyle={styles.frequencyPickerItem}
                                    onValueChange={(index) => setFrequency(index) }>
                                    {frequencyList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={i}/>
                                    ))}
                                </Picker>
                            )}
                            <TouchableOpacity onPress={() => {updateShowDatePicker()}}>
                                <Text style={styles.inputViewText}>Date of first payment</Text>
                                <Text style={styles.inputViewTextInput}>{Moment(date).format('DD MMM YYYY')}</Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode='date'
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={onDateChange}
                                />          
                            )}
                        </View>
                    )}
                </View>
                <TouchableOpacity style={amount > 0 && toAccount != undefined ? styles.doneButtonEnabled : styles.doneButtonDisabled} disabled={amount == 0 || toAccount == undefined} onPress={() => {
                    transfer(fromAccount.bank_id, fromAccount.id, toAccount.bank_id, toAccount.id, amount);
                    // apply timeout to show updated account balances - unless transfer is taking longer than expected
                    // we could add another API call here to check for the status of the transaction request
                    setTimeout(navigation.goBack,
                        250
                    );
                }}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

function transfer(fromBankId, fromAccountId, toBankId, toAccountId, amount) {
    getAsyncStorage('obpToken')
    .then((token) => {
        getChallengeTypes(fromBankId, fromAccountId, token)
        .then((challengeTypes) => {
          const challengeType = challengeTypes[0] // just gets first challenge type from available types
          initiateTransactionRequest(fromBankId, fromAccountId, toBankId, toAccountId, challengeType, token, amount)
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
    },
    scrollContainer: {
    },
    accountsListContainer: {
        width: '100%',
    },
    accountContainer: {
        backgroundColor: WHITE,
        alignSelf: 'center',
        width: '97%',
        marginBottom: '0.5%',
        borderColor: GREY_MEDIUM,
        borderWidth: 1,
        borderTopWidth: 1.5,
    },
    accountContainerTop: {
        flexDirection: 'row',
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
        alignItems: 'flex-start',
        padding: '1%',
        paddingBottom: '2%'
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
    amountContainer: {
        paddingVertical: '2%',
        alignSelf: 'center',
        width: '97%',
        backgroundColor: WHITE,
        alignItems: 'center',
        borderColor: GREY_MEDIUM,
        borderWidth: 1,
        borderTopWidth: 1.5,
        marginBottom: '0.5%',
    },
    standingOrderContainer: {
        backgroundColor: WHITE,
        alignSelf: 'center',
        width: '97%',
        borderColor: GREY_MEDIUM,
        borderWidth: 1,
        borderTopWidth: 1.5,
    },
    inputView: {
        paddingTop: '2%',
        alignItems: 'center',
        backgroundColor: GREY_MEDIUM
    },
    inputViewText: {
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_SMALL,
        color: GREY_MEDIUM,
        alignSelf: 'flex-start',
        paddingLeft: '2%',
    },
    inputViewTextInput: {
        width: '100%',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_STANDARD_LARGE,
        color: GREY_DARK,
        alignSelf: 'flex-start',
        paddingLeft: '2%',
    },
    frequencyPicker: {
        height: 140,
    },
    frequencyPickerItem: {
        color: BLACK,
        fontSize: FONT_SIZE_STANDARD,
        height: '100%',
    },
    doneButtonEnabled: {
        alignSelf: 'center',
        width: '85%',
        padding: '1.5%',
        backgroundColor: GREEN_PARIS,
        borderRadius: 20,
        marginVertical: '1%'
    },
    doneButtonDisabled: {
        alignSelf: 'center',
        width: '85%',
        padding: '1.5%',
        backgroundColor: GREY_MEDIUM,
        borderRadius: 20,
        marginVertical: '1%'
    },
    doneButtonText: {
        color: WHITE,
        textAlign: 'center',
        fontWeight: FONT_WEIGHT_REGULAR,
        fontSize: FONT_SIZE_HEADING
    }
});