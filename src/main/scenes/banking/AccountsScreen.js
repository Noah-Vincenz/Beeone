import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function AccountsScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <Text>Accounts Screen</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});