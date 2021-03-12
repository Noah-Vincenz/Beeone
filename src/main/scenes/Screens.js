import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountsScreen } from 'src/scenes/banking/AccountsScreen.js';
import { AddAccountScreen } from 'src/scenes/banking/AddAccountScreen.js';
import { AddCategoryScreen } from 'src/scenes/banking/AddCategoryScreen.js';
import { GoalsScreen } from 'src/scenes/banking/GoalsScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { GREEN_MINT, GREEN_PARIS, GREY_LIGHT } from 'resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD } from 'resources/styles/typography';
import { TransferScreen } from './banking/TransferScreen.js';
import { ChooseAccountScreen } from './banking/ChooseAccountScreen.js';
import { SelectRecipientScreen } from './banking/SelectRecipientScreen.js';
import { PaySomeoneNewScreen } from './banking/PaySomeoneNewScreen.js';
import { PayScreen } from './banking/PayScreen.js';
import { StackActions } from '@react-navigation/native';

const TransferStack = createStackNavigator();
const PayStack = createStackNavigator();
const FinancesStack = createStackNavigator();
const GoalsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Finances Screens

const TransferNavStack = () => {
    return (
      <TransferStack.Navigator mode="modal" initialRouteName="Transfer between accounts">
        <TransferStack.Screen name="Transfer between accounts" component={TransferScreen}/>
        <TransferStack.Screen name="Choose account" component={ChooseAccountScreen}/>
      </TransferStack.Navigator>
    );
}
  
const PayNavStack = () => {
    const navigation = useNavigation()
    return (
      <PayStack.Navigator mode="modal" initialRouteName="Make a payment">
        <PayStack.Screen name="Make a payment" component={PayScreen}/>
        <PayStack.Screen name="Select recipient" component={SelectRecipientScreen}/>
        <PayStack.Screen name="Pay someone new" component={PaySomeoneNewScreen} options={{
          headerRight: () => (
            <Button title="Create" onPress={() => navigation.navigate('Select recipient')} />
          )
        }}/>
      </PayStack.Navigator>
    );
}
  
const FinancesNavStack = () => {
    return (
      <FinancesStack.Navigator initialRouteName="Accounts">
        <FinancesStack.Screen name="Accounts" component={AccountsScreen}/>
        <FinancesStack.Screen name="Add Account" component={AddAccountScreen}/>
        <FinancesStack.Screen name="Transfer between accounts" component={TransferNavStack} options={{ headerShown: false }}/>
        <FinancesStack.Screen name="Make a payment" component={PayNavStack} options={{ headerShown: false }}/>
      </FinancesStack.Navigator>
    );
}

// Goals Screens
const GoalsNavStack = () => {
    return (
      <GoalsStack.Navigator initialRouteName="Goals">
        <GoalsStack.Screen name="Goals" component={GoalsScreen}/>
        <GoalsStack.Screen name="Add Category" component={AddCategoryScreen}/>
      </GoalsStack.Navigator>
    );
}

export const Screens = () => {
  return (
    <Tab.Navigator tabBarOptions={{
        activeTintColor: GREEN_PARIS,
        inactiveTintColor: GREY_LIGHT,
        labelStyle: {
          fontSize: FONT_SIZE_SMALL
        },
      }}>
      <Tab.Screen name="Accounts" component={FinancesNavStack}/>
      <Tab.Screen name="Goals" component={GoalsNavStack}/>
    </Tab.Navigator>
  );
}
