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
import { DirectDebitsScreen } from './finances/DirectDebitsScreen.js';
import { TransactionsScreen } from './finances/TransactionsScreen.js';
import { StandingOrdersScreen } from './finances/StandingOrdersScreen.js';
import { ChooseAccountScreen } from './finances/ChooseAccountScreen.js';
import { SelectRecipientScreen } from './finances/SelectRecipientScreen.js';
import { PaySomeoneNewScreen } from './finances/PaySomeoneNewScreen.js';
import { PayScreen } from './finances/PayScreen.js';
import { AccountInformationScreen } from './finances/AccountInformationScreen.js';
import { StackActions } from '@react-navigation/native';
import { ImpactScreen } from './ImpactScreen';
import { SafeScreen } from './SafeScreen';
import { AccountsScreen } from './AccountsScreen';
import { HomeScreen } from './HomeScreen';
import { MyContext } from '../util/Context';
import { Ionicons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();
const TransferStack = createStackNavigator();
const PayStack = createStackNavigator();
const FinancesStack = createStackNavigator();
const ImpactStack = createStackNavigator();
const SafeStack = createStackNavigator();
const GoalsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LeftHeader = () => {
  const { signOut } = React.useContext(MyContext);
  return (
    <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
      <Image
        source={require('resources/img/profile.png')}
        style={styles.signOutButtonImg}
      />
    </TouchableOpacity>
  );
};

const RightHeader = () => {
  return (
    <TouchableOpacity style={styles.messagesButton}>
      <Image
        source={require('resources/img/comu.png')}
        style={styles.messagesButtonImg}
      />
    </TouchableOpacity>
  );
};

// Home Screens
const HomeNavStack = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        headerLeft: LeftHeader,
        headerRight: RightHeader
      }}/>
    </HomeStack.Navigator>
  );
}

// Finances Screen
const TransferNavStack = () => {
  return (
    <TransferStack.Navigator mode="modal" initialRouteName="Transfer between accounts">
      <TransferStack.Screen name="Transfer between accounts" component={TransferScreen}/>
      <TransferStack.Screen name="Choose account" component={ChooseAccountScreen}/>
    </TransferStack.Navigator>
  );
}

// Finances Screen
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

// Finances Screens
const FinancesNavStack = () => {
  return (
    <FinancesStack.Navigator initialRouteName="Finances">
      <FinancesStack.Screen name="Finances" component={AccountsScreen} options={{
        headerLeft: LeftHeader,
        headerRight: RightHeader
      }}/>
      <FinancesStack.Screen name="Add Account" component={AddAccountScreen}/>
      <FinancesStack.Screen name="Transfer between accounts" component={TransferNavStack} options={{ headerShown: false }}/>
      <FinancesStack.Screen name="Make a payment" component={PayNavStack} options={{ headerShown: false }}/>
      <FinancesStack.Screen name="Account Information" component={AccountInformationScreen}/>
      <FinancesStack.Screen name="Transactions" component={TransactionsScreen}/>
      <FinancesStack.Screen name="Direct Debits" component={DirectDebitsScreen}/>
      <FinancesStack.Screen name="Standing Orders" component={StandingOrdersScreen}/>
    </FinancesStack.Navigator>
  );
}

// Impact Screens
const ImpactNavStack = () => {
  return (
    <ImpactStack.Navigator initialRouteName="Impact">
        <ImpactStack.Screen name="Impact" component={ImpactScreen} options={{
          headerLeft: LeftHeader,
          headerRight: RightHeader
        }}/>
    </ImpactStack.Navigator>
  );
}

// Goals Screens
const GoalsNavStack = () => {
  return (
    <GoalsStack.Navigator initialRouteName="Goals">
      <GoalsStack.Screen name="Goals" component={GoalsScreen} options={{
        headerLeft: LeftHeader,
        headerRight: RightHeader
      }}/>
      <GoalsStack.Screen name="Add Category" component={AddCategoryScreen}/>
    </GoalsStack.Navigator>
  );
}

// Safe Screens
const SafeNavStack = () => {
  return (
    <SafeStack.Navigator initialRouteName="Safe">
      <SafeStack.Screen name="Safe" component={SafeScreen} options={{
        headerLeft: LeftHeader,
        headerRight: RightHeader
      }}/>
    </SafeStack.Navigator>
  );
}

// Tab navigator for all screens
export function ScreensTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Finances" 
      tabBarOptions={{
        activeTintColor: GREEN_PARIS,
        inactiveTintColor: GREY_LIGHT,
        labelStyle: {
          fontSize: FONT_SIZE_SMALL
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = focused ? require('resources/img/home.png') : require('resources/img/home-gr.png');
          } else if (route.name == 'Finances') {
            iconName = focused ? require('resources/img/finances.png') : require('resources/img/finances-gr.png');
          } else if (route.name == 'Impact') {
            iconName = focused ? require('resources/img/impact.png') : require('resources/img/impact-gr.png');
          } else if (route.name == 'Goals') {
            iconName = focused ? require('resources/img/goals.png') : require('resources/img/goals-gr.png');
          } else if (route.name == 'Safe') {
            iconName = focused ? require('resources/img/safe.png') : require('resources/img/safe-gr.png');
          }
          return <Image source={iconName} style={styles.tabIconImg}/>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavStack}/>
      <Tab.Screen name="Finances" component={FinancesNavStack}/>
      <Tab.Screen name="Impact" component={ImpactNavStack}/>
      <Tab.Screen name="Goals" component={GoalsNavStack}/>
      <Tab.Screen name="Safe" component={SafeNavStack}/>
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
  tabIconImg: {
    marginTop: '3%',
    flex: 1,
    resizeMode: 'contain',
  }
})
