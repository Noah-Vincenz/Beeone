import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MyNewsFeedScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>News Feed Screen</Text>
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