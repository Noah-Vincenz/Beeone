import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD } from 'resources/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorage } from '../../util/StorageHelper';
import { base_url, joinPath } from '../../util/ObpApiUtils';
import { getLogoSourcePath, getRealBankName } from '../../util/AccountUtils';
import { GREY_LIGHT, WHITE, SECONDARY } from 'resources/styles/colours';
import { BLACK, GREY_DARK, GREY_MEDIUM } from '../../resources/styles/colours';

export function AddAccountScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [masterBanks, setMasterBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [search, setSearch] = useState('');
  const columns = 2;

  useEffect(() => {
    getAsyncStorage('obpToken')
    .then((token) => {
      fetch(joinPath(base_url, '/obp/v4.0.0/banks'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `DirectLogin token="${token}"`
        },
      })
      .then((response) => response.json())
      .then((json) => { 
        setMasterBanks(json.banks)
        setFilteredBanks(json.banks.slice(0,6))
        setLoading(false);
      }) 
      .catch((error) => console.error(error))
    })
  }, []);
  
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterBanks.filter(function (item) {
        // apply filter for text inserted in search bar
        const itemData = getRealBankName(item.id)
          ? getRealBankName(item.id).toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredBanks(newData);
      setSearch(text);
    } else { // when searched text is blank
      setFilteredBanks(masterBanks.slice(0,6));
      setSearch(text);
    }
  };

  const formatData = (data) => { // to ensure the last row is not stretched, but consists of a single item starting from left
    const fullRows = Math.floor(data.length / columns);
    let lastRowNumberOfElems = data.length - (fullRows * columns);
    while (lastRowNumberOfElems !== columns && lastRowNumberOfElems !== 0) {
      data.push({key: `blank-${lastRowNumberOfElems}`, empty: true});
      lastRowNumberOfElems++;
    }
    return data;
  }

  const renderItem = ({ item, index }) => {
    if (item.empty) {
      return <View style={[styles.accountContainer, styles.accountContainerInvisible]}/>;
    }
    return (
      <View style={styles.accountContainer}>
        <Image
          style={styles.bankLogo}
          source={getLogoSourcePath(item.id)}
        />
        <View style={styles.bankIdContainer}>
          <Text style={styles.accountContainerText}>{getRealBankName(item.id)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search"
        />
        {isLoading ? <ActivityIndicator/> : (
            <FlatList 
              style={styles.accountsContainer}
              numColumns={columns}
              data={formatData(filteredBanks)} // we only want to display the first 6 banks; the others can be searched
              renderItem={renderItem}
            />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: GREY_LIGHT
    },
    textInputStyle: {
      height: '8%',
      width: '97%',
      paddingLeft: 10,
      margin: 5,
      fontSize: FONT_SIZE_STANDARD,
      borderColor: GREY_MEDIUM,
      borderWidth: 1,
      borderTopWidth: 1.5,
      backgroundColor: WHITE
    },
    accountsContainer: {
      backgroundColor: GREY_LIGHT,
      width: '100%',
    },
    accountContainer: {
      backgroundColor: GREY_MEDIUM,
      alignItems: 'center',
      flex: 1,
      height: 180,
      margin: '1.5%',
      justifyContent: 'center',
      paddingTop: '5%'
    },
    accountContainerInvisible: {
      backgroundColor: 'transparent',
    },
    bankLogo: {
      flex: 2,
      resizeMode: 'contain',
    },
    bankIdContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center'
    },
    accountContainerText: {
      fontWeight: FONT_WEIGHT_REGULAR,
      fontSize: FONT_SIZE_STANDARD,
      color: BLACK,
      textAlign: 'center'
    },
});