import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { WHITE, SECONDARY, GREY_LIGHT, GREY_EXTRA_LIGHT } from 'resources/styles/colours'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';

export function AddCategoryScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
        <Text>Create a new Category</Text>
        <TouchableOpacity style={styles.buttonStyles}>
            <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GREY_EXTRA_LIGHT
    },
    buttonStyles: {
      backgroundColor: SECONDARY,
    },
    buttonText: {
        color: WHITE,
        fontWeight: FONT_WEIGHT_BOLD,
        fontSize: FONT_SIZE_HEADING
    }
});