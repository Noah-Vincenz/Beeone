import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { FONT_WEIGHT_BOLD, FONT_SIZE_HEADING, FONT_WEIGHT_REGULAR, FONT_SIZE_STANDARD } from 'resources/styles/typography';
import { GREEN_PARIS, GREY_LIGHT, BLACK, WHITE, GREY_DARK, GREY_MEDIUM, GREY_EXTRA_LIGHT } from 'resources/styles/colours';

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
          <TouchableOpacity style={styles.addPhotoButton}>
            <Image
                source={require('resources/img/camera-icon.png')}
                style={styles.addPhotoButtonImg}
            />
            <Text style={styles.buttonText}>Add a photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer:{
    backgroundColor: GREY_EXTRA_LIGHT,
    flex: 1,
  },
  mainContainer:{
    flex: 1,
    alignItems: 'center',
  },
  postContainer:{
    borderRadius: 5,
    width: '95%',
    backgroundColor: WHITE,
    height: '25%',
    marginVertical: '2%',
    alignItems: 'center',
    padding: '1%',
  },
  textInput: {
    width: '100%',
    fontWeight: FONT_WEIGHT_REGULAR,
    fontSize: FONT_SIZE_STANDARD,
    color: GREY_DARK,
  },
  addPhotoButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: GREY_LIGHT,
    width: '100%',
    marginVertical: '1%',
    position:'absolute',
    bottom: 0,
    paddingHorizontal: '10%',
    flex: 1,
    resizeMode: 'contain',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPhotoButtonImg: {
    position:'absolute',
    left: 0,
    width: 60,
    height: 60,
  },
  buttonText: {
      textAlign: 'center',
      color: BLACK,
      fontSize: FONT_SIZE_HEADING
  },
});