import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyMarketplaceScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Marketplace Screen</Text>
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