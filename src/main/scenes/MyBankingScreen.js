import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountsScreen } from 'src/scenes/banking/AccountsScreen.js';
import { AddAccountScreen } from 'src/scenes/banking/AddAccountScreen.js';
import { AddCategoryScreen } from 'src/scenes/banking/AddCategoryScreen.js';
import { SpendingScreen } from 'src/scenes/banking/SpendingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { GREEN_MINT, GREEN_PARIS, GREY_LIGHT } from '../resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD } from '../resources/styles/typography';

const Stack = createStackNavigator();

const AccountsNavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Accounts">
      <Stack.Screen name="Accounts" component={AccountsScreen}/>
      <Stack.Screen name="Add Account" component={AddAccountScreen}/>
    </Stack.Navigator>
  );
}

const SpendingNavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Spending">
      <Stack.Screen name="Spending" component={SpendingScreen}/>
      <Stack.Screen name="Add Category" component={AddCategoryScreen}/>
    </Stack.Navigator>
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