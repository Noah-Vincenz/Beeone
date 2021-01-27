import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyBankingScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Banking Screen</Text>
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