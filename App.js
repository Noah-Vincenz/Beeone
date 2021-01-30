import React from 'react';
import { HomeScreen } from 'src/scenes/HomeScreen.js';
import { MyNewsFeedScreen } from 'src/scenes/MyNewsFeedScreen.js';
import { MyBankingScreen } from 'src/scenes/MyBankingScreen.js';
import { MyDocumentsScreen } from 'src/scenes/MyDocumentsScreen.js';
import { MyMarketplaceScreen } from 'src/scenes/MyMarketplaceScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const NavStack = () => { // declare NavStack as fat arrow functions
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }}/>
      <Stack.Screen name="MyNewsFeedScreen" component={MyNewsFeedScreen} options={{ title: 'News Feed' }}/>
      <Stack.Screen name="MyBankingScreen" component={MyBankingScreen} options={{ title: 'Banking' }}/>
      <Stack.Screen name="MyDocumentsScreen" component={MyDocumentsScreen} options={{ title: 'Documents' }} />
      <Stack.Screen name="MyMarketplaceScreen" component={MyMarketplaceScreen} options={{ title: 'Marketplace' }} />
    </Stack.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  )
}
