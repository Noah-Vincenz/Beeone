import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING } from 'resources/styles/typography';
import { GREEN_PARIS, GREY_LIGHT, WHITE } from 'resources/styles/colours';

export function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.parentContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.postContainer}> 
          <TextInput style={styles.textInput}
            placeholder="What would you like to share?"
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.buttonText}>Add a photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer:{
    backgroundColor: GREY_LIGHT,
    flex: 1,
  },
  mainContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  postContainer:{
    borderRadius: 5,
    width: '95%',
    backgroundColor: WHITE,
    height: 50,
    marginBottom: '2%',
    justifyContent: "center",
    padding: '2%'
  },
  addPhotoButton: {
      backgroundColor: GREEN_PARIS,
      marginVertical: '2%',
      height: '15%',
      width: '100%',
      justifyContent: 'center',
  },
  buttonText: {
      textAlign: 'center',
      color: WHITE,
      fontWeight: FONT_WEIGHT_BOLD,
      fontSize: FONT_SIZE_HEADING
  }
});