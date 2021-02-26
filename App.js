import React, { useEffect, useState, useMemo, useReducer } from 'react';
import { HomeScreen } from 'src/scenes/HomeScreen.js';
import { MyNewsFeedScreen } from 'src/scenes/MyNewsFeedScreen.js';
import { MyBankingScreen } from 'src/scenes/MyBankingScreen.js';
import { MyDocumentsScreen } from 'src/scenes/MyDocumentsScreen.js';
import { MyMarketplaceScreen } from 'src/scenes/MyMarketplaceScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from 'src/scenes/SignInScreen.js';
import { SplashScreen } from 'src/scenes/SplashScreen.js';
import { StyleSheet, View, Alert } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { MyContext } from 'src/util/Context';
import { ObpApiUtils } from 'src/util/ObpApiUtils.js';
import { joinPath, base_url, login } from 'src/util/ObpApiUtils';
import { reducer, initialState } from 'src/reducer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage, setAsyncStorage } from 'src/util/StorageHelper.js'
import { removeAsyncStorage } from 'src/util/StorageHelper';

const Stack = createStackNavigator();

const HomeNavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="News Feed" component={MyNewsFeedScreen}/>
      <Stack.Screen name="Banking" component={MyBankingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Documents" component={MyDocumentsScreen}/>
      <Stack.Screen name="Marketplace" component={MyMarketplaceScreen}/>
    </Stack.Navigator>
  );
}

export default App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [obpToken, setToken] = useState('');
  const consumerKey = process.env['CONSUMER_KEY'];

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    // the loading screen will be unmounted and thrown away
    const bootstrapAsync = async () => {
      getAsyncStorage('obpToken')
      .then((token) => { console.log(`token to restore: ${token}`); dispatch({ type: 'RESTORE_TOKEN', obpToken: token }); })
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(() => ({
      signIn: async data => {        
        console.log(`Login credentials submitted: ${data.username}, ${data.password}`)
        // send username and password to server and get token
        // persist token using `AsyncStorage`
        login(data.username, data.password, consumerKey)
        .then((json) => { 
          if (json.token == null || json.token == undefined || json.token == '') {
            Alert.alert(
              "Authentication Error",
              "User could not be logged in.\nPlease ensure username and password are correct.",
              [{ text: "OK" }],
              { cancelable: false }
            );
          } else {
            setToken(json.token); 
            setAsyncStorage('obpToken', json.token)
            dispatch({ type: 'SIGN_IN', obpToken: json.token }); 
          }
        })
        .catch((error) => console.error(error))
      },
      signOut: () => {
        removeAsyncStorage('obpToken')
        .then((bool) => { console.log(`signed out: ${bool}`); dispatch({ type: 'SIGN_OUT' }) })
      }, 
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', obpToken: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <MyContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.isLoading ? (
            <Stack.Screen name="Splash Screen" component={SplashScreen} />
          ) : state.obpToken == null ? ( // No token found, user is not signed in
            <Stack.Screen
              name="Sign In"
              component={SignInScreen}
              options={{
                title: '',
                headerBackTitle: 'null',
                headerBackTitleVisible: false,
                animationTypeForReplace: state.isSignout ? 'pop' : 'push' // pop animation when logging out -- shows glimpse of back button
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeNavStack}/> // User is signed in
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

