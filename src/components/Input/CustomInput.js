import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { EyeIcon1 } from '../../assets/icons';
import { EyeIcon2 } from '../../assets/icons';
import { StyleSheet } from 'react-native';
import CUSTOM_COLOR from '../../constants/colors';
import FONT_FAMILY from '../../constants/fonts';
import SCALE from '../../constants/reponsive';
const CustomInput = (props) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isEmailInput, setIsEmailInput] = useState(false);

  const handleEmailFocus = () => {
    setIsEmailInput(true);
    props.onFocus();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {props.label === 'Password' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <TextInput
            secureTextEntry={isSecureEntry}
            placeholder={props.label}
            placeholderTextColor="grey"
            style={{
              flex: 1,
              borderColor: 'gray',
              padding: 8,
            }}
            onFocus={props.onFocus}
            onChangeText={props.onChangeText}
          />
          <TouchableOpacity
            onPress={() => {
              setIsSecureEntry(!isSecureEntry);
            }}
          >
            <Image
              source={isSecureEntry ? EyeIcon1 : EyeIcon2}
              style={{ width: 24, height: 24, marginLeft: 8 }}
            />
          </TouchableOpacity>
          {props.error && (
            <Text style={{ marginTop: 7, color: '#FFF', fontSize: 12 }}>
              {props.error}
            </Text>
          )}
          <View style={{ width: 10 }} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <TextInput
            editable
            multiline={false}
            placeholder={props.label}
            placeholderTextColor="grey"
            style={{
              flex: 1,
              borderColor: 'gray',
              padding: 8,
            }}
            secureTextEntry={false}
            keyboardType="email-address"
            onFocus={handleEmailFocus}
            onChangeText={(text) => props.onChangeText(text)}
          />
          {isEmailInput && props.error && (
            <Text style={{ marginTop: 7, color: '#FFF', fontSize: 12 }}>
              {props.error}
            </Text>
          )}
          <View style={{ width: 10 }} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: SCALE.reSizeWidth(343),
    // height: SCALE.reSizeHeight(53),
    // borderRadius: 12,
    borderColor: CUSTOM_COLOR.LightGray,
    borderWidth: 1,
    // paddingHorizontal: 30,
    // marginTop: SCALE.reSizeHeight(20),
    marginBottom: SCALE.reSizeHeight(20),
  },
  IconPassword: {
    width: SCALE.reSizeWidth(24),
    height: SCALE.reSizeHeight(24),
    left: SCALE.reSizeWidth(280),
    top: SCALE.reSizeHeight(12),
    position: 'absolute',
  },
});

export default CustomInput;