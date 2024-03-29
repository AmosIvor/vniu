import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native'
import { IMAGES } from '@assets'
const SignUpScreen = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Image source={IMAGES.IMG_ICON_PREVIOUS} />
      </TouchableOpacity>

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Enter your data to continue!</Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput style={styles.input} placeholder='Severus Snape' value={fullName} onChangeText={setFullName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder='snape@example.com'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'
      />

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20
  },
  backButton: {
    width: 30,
    height: 30,
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 4
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A94FF',
    textAlign: 'center',
    marginVertical: 10
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16
  },
  signUpButton: {
    backgroundColor: '#1A94FF',
    paddingVertical: 12,
    borderRadius: 8
  },
  signUpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default SignUpScreen
