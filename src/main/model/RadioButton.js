import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD, FONT_SIZE_SMALL } from 'resources/styles/typography';
import { WHITE, GREY_DARK, GREY_EXTRA_LIGHT, GREY_LIGHT } from 'resources/styles/colours';
import { GREEN_MINT, GREEN_PARIS } from '../resources/styles/colours';

export const RadioButton = ({ onPress, selected, children }) => {
    return (
        <View style={styles.radioButtonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.radioButton}>
            {selected ? <View style={styles.radioButtonIcon} /> : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.radioButtonText}>{children}</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    radioButtonContainer: {
        backgroundColor: WHITE,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1%'
    },
    radioButton: {
        height: 30,
        width: 30,
        backgroundColor: GREY_EXTRA_LIGHT,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: GREY_LIGHT,
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: '90%',
        width: '90%',
        borderRadius: 20,
        backgroundColor: GREEN_PARIS
    },
    radioButtonText: {
        color: GREY_DARK,
        marginLeft: '4%'
    }
});