import React from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, Button } from 'react-native'
import { IMAGES } from '@assets'
const ForgotPasswordScreen = () => {
  return (
    <View
      style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 17, justifyContent: 'center', alignItems: 'center' }}
    >
      <TouchableOpacity style={{ position: 'absolute', left: 10, top: 10 }}>
        <Image source={IMAGES.IMG_ICON_PREVIOUS} style={{ width: 24, height: 24, padding: 8 }} />
      </TouchableOpacity>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 50 }}>Forgot Password</Text>
      <Image source={IMAGES.logo} style={{ width: '100%', height: 110, marginBottom: 30 }} />
      <Text style={{ color: '#8F959E', marginBottom: 3, fontSize: 16 }}>Email address</Text>
      <TextInput
        style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 100 }}
        keyboardType='email-address'
        placeholder='Enter your email'
      />
      <Text style={{ textAlign: 'center', marginBottom: 6 }}>
        Please write your email to receive a password reset email to set a new password.
      </Text>
      <Button
        title='SEND MAIL'
        onPress={() => {
          /* Handle send mail */
        }}
      />
    </View>
  )
}

export default ForgotPasswordScreen
