import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountsScreen } from 'src/scenes/banking/AccountsScreen.js';
import { SpendingScreen } from 'src/scenes/banking/SpendingScreen.js';

const Tab = createBottomTabNavigator();

const NavTab = () => { // declare NavTab as fat arrow functions
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accounts" component={AccountsScreen} options={{ title: 'Accounts' }}/>
      <Tab.Screen name="Spending" component={SpendingScreen} options={{ title: 'Spending' }}/>
    </Tab.Navigator>
  );
}

export function MyBankingScreen({ navigation }) {
    return (
      <NavigationContainer independent={true}>
        <NavTab />
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});