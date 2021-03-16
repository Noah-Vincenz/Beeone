import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AddAccountScreen } from 'src/scenes/finances/AddAccountScreen.js';
import { AddCategoryScreen } from 'src/scenes/goals/AddCategoryScreen.js';
import { GoalsScreen } from 'src/scenes/GoalsScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../util/StorageHelper';
import { GREEN_MINT, GREEN_PARIS, GREY_LIGHT } from 'resources/styles/colours';
import { FONT_SIZE_SMALL, FONT_SIZE_STANDARD } from 'resources/styles/typography';
import { TransferScreen } from './finances/TransferScreen.js';
import { ChooseAccountScreen } from './finances/ChooseAccountScreen.js';
import { SelectRecipientScreen } from './finances/SelectRecipientScreen.js';
import { PaySomeoneNewScreen } from './finances/PaySomeoneNewScreen.js';
import { PayScreen } from './finances/PayScreen.js';
import { StackActions } from '@react-navigation/native';
import { ImpactScreen } from './ImpactScreen';
import { AccountsScreen } from './AccountsScreen';
import { HomeScreen } from './HomeScreen';
import { MyContext } from '../util/Context';

const HomeStack = createStackNavigator();
const TransferStack = createStackNavigator();
const PayStack = createStackNavigator();
const FinancesStack = createStackNavigator();
const ImpactStack = createStackNavigator();
const GoalsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Screens
const HomeNavStack = () => {
  const { signOut } = React.useContext(MyContext);
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: () => (
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Image
                source={require('resources/img/profile-icon.png')}
                style={styles.signOutButtonImg}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.messagesButton}>
              <Image
                source={require('resources/img/message-icon.png')}
                style={styles.messagesButtonImg}
              />
            </TouchableOpacity>
          )
      }}/>
    </HomeStack.Navigator>
  );
}

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
      <PayStack.Screen name="Pay someone new" component={PaySomeoneNewScreen}/>
    </PayStack.Navigator>
  );
}

const FinancesNavStack = () => {
  const { signOut } = React.useContext(MyContext);
  return (
    <FinancesStack.Navigator initialRouteName="Finances">
      <FinancesStack.Screen name="Finances" component={AccountsScreen} options={{
        headerLeft: () => (
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Image
              source={require('resources/img/profile-icon.png')}
              style={styles.signOutButtonImg}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.messagesButton}>
            <Image
              source={require('resources/img/message-icon.png')}
              style={styles.messagesButtonImg}
            />
          </TouchableOpacity>
        )
      }}/>
      <FinancesStack.Screen name="Add Account" component={AddAccountScreen}/>
      <FinancesStack.Screen name="Transfer between accounts" component={TransferNavStack} options={{ headerShown: false }}/>
      <FinancesStack.Screen name="Make a payment" component={PayNavStack} options={{ headerShown: false }}/>
    </FinancesStack.Navigator>
  );
}

// Impact Screens
const ImpactNavStack = () => {
  const { signOut } = React.useContext(MyContext);
  return (
    <ImpactStack.Navigator initialRouteName="Impact">
        <ImpactStack.Screen name="Impact" component={ImpactScreen} options={{
          headerLeft: () => (
            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Image
                source={require('resources/img/profile-icon.png')}
                style={styles.signOutButtonImg}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.messagesButton}>
              <Image
                source={require('resources/img/message-icon.png')}
                style={styles.messagesButtonImg}
              />
            </TouchableOpacity>
          )
        }}/>
    </ImpactStack.Navigator>
  );
}

// Goals Screens
const GoalsNavStack = () => {
  const { signOut } = React.useContext(MyContext);
  return (
    <GoalsStack.Navigator initialRouteName="Goals">
      <GoalsStack.Screen name="Goals" component={GoalsScreen} options={{
        headerLeft: () => (
          <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
            <Image
              source={require('resources/img/profile-icon.png')}
              style={styles.signOutButtonImg}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.messagesButton}>
            <Image
              source={require('resources/img/message-icon.png')}
              style={styles.messagesButtonImg}
            />
          </TouchableOpacity>
        )
      }}/>
      <GoalsStack.Screen name="Add Category" component={AddCategoryScreen}/>
    </GoalsStack.Navigator>
  );
}

// Tab navigator for all screens
export function ScreensTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Finances" tabBarOptions={{
        activeTintColor: GREEN_PARIS,
        inactiveTintColor: GREY_LIGHT,
        labelStyle: {
          fontSize: FONT_SIZE_SMALL
        },
    }}>
      <Tab.Screen name="Home" component={HomeNavStack}/>
      <Tab.Screen name="Finances" component={FinancesNavStack}/>
      <Tab.Screen name="Impact" component={ImpactNavStack}/>
      <Tab.Screen name="Goals" component={GoalsNavStack}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    paddingHorizontal: '10%',
    flex: 1,
    resizeMode: 'contain',
  },
  signOutButtonImg: {
    width: 40,
    height: 40,
  },
  messagesButton: {
    paddingHorizontal: '10%',
    flex: 1,
    resizeMode: 'contain',
  },
  messagesButtonImg: {
    width: 40,
    height: 40,
  },
})
