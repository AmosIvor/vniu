import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native'
import { CustomInput } from '@components'
import { appColors } from '@constants'
let checkEmail = false
let checkName = false
let checkPassword1 = false
let checkPassword2 = false
const SignInScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const [inputs, setInputs] = useState({
    Email: '',
    Password: ''
  })
  const [errors, setErrors] = useState({})
  const validate = () => {
    Keyboard.dismiss()
    let isValid = true
    if (
      !inputs.Email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      handleError('Please input a valid email', 'Email')
      isValid = false
    } else {
      checkEmail = true
    }

    if (!inputs.Password) {
      handleError('Please input password', 'Password')
      isValid = false
    } else {
      if (inputs.Password.length < 8) {
        handleError('Min password length of 8', 'Password')
        isValid = false
      } else {
        checkPassword1 = true
        checkPassword2 = true
      }
    }
  }
  const handleOnchange = (text: any, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }))
  }
  const handleError = (error: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }))
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black', paddingBottom: 14 }}>Sign in</Text>
        <Text style={{ fontSize: 18, paddingBottom: 4 }}>Welcome! Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 18, color: appColors.Primary, marginBottom: 12 }}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ alignSelf: 'stretch' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: '100%', height: 110, marginBottom: 30 }}
          />
        </View>
        {/* <View style={{ height: 100 }} /> */}
        <CustomInput
          label='Email'
          onChangeText={(text: any) => handleOnchange(text, 'Email')}
          error={errors.Email}
          onFocus={() => handleError(null, 'Email')}
        />

        <CustomInput
          label='Password'
          onChangeText={(text: any) => handleOnchange(text, 'Password')}
          error={errors.Password}
          onFocus={() => handleError(null, 'Password')}
        />
        <TouchableOpacity
          style={{
            backgroundColor: appColors.Primary,
            paddingVertical: 12,
            borderRadius: 8,
            marginBottom: 10,
            marginTop: 5
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ color: appColors.Primary, textAlign: 'right', marginVertical: 10 }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SignInScreen
