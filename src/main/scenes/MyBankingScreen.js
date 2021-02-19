import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountsScreen } from 'src/scenes/banking/AccountsScreen.js';
import { AddAccountScreen } from 'src/scenes/banking/AddAccountScreen.js';
import { AddCategoryScreen } from 'src/scenes/banking/AddCategoryScreen.js';
import { SpendingScreen } from 'src/scenes/banking/SpendingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { GREEN_MINT, GREEN_PARIS, GREY_LIGHT } from 'resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD } from 'resources/styles/typography';
import { TransferScreen } from './banking/TransferScreen.js';
import { ChooseAccountScreen } from './banking/ChooseAccountScreen.js';
import { StackActions } from '@react-navigation/native';

const MainStack = createStackNavigator();
const TransferStack = createStackNavigator();

const TransferNavStack = () => {
  const navigation = useNavigation();
  return (
    <TransferStack.Navigator mode="modal" initialRouteName="Transfer between accounts">
      <TransferStack.Screen name="Transfer between accounts" component={TransferScreen}/>
      <TransferStack.Screen name="Choose account" component={ChooseAccountScreen}/>
    </TransferStack.Navigator>
  );
}

const AccountsNavStack = () => {
  return (
    <MainStack.Navigator initialRouteName="Accounts">
      <MainStack.Screen name="Accounts" component={AccountsScreen}/>
      <MainStack.Screen name="Add Account" component={AddAccountScreen}/>
      <MainStack.Screen name="Transfer between accounts" component={TransferNavStack} options={{ headerShown: false }}/>
      {/* <MainStack.Screen name="Transfer between accounts" component={TransferScreen}/>
      <MainStack.Screen name="Choose account" component={ChooseAccountScreen}/> */}
    </MainStack.Navigator>
  );
}

const SpendingNavStack = () => {
  return (
    <MainStack.Navigator initialRouteName="Spending">
      <MainStack.Screen name="Spending" component={SpendingScreen}/>
      <MainStack.Screen name="Add Category" component={AddCategoryScreen}/>
    </MainStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function MyBankingScreen({ navigation }) {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: GREEN_PARIS,
      inactiveTintColor: GREY_LIGHT,
      labelStyle: {
        fontSize: FONT_SIZE_SMALL
      },
    }}>
      <Tab.Screen name="Accounts" component={AccountsNavStack}/>
      <Tab.Screen name="Spending" component={SpendingNavStack}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
});