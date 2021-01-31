import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SpendingScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <Text>Spending Screen</Text>
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