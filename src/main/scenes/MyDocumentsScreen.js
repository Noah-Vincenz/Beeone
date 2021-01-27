import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyDocumentsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Documents Screen</Text>
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