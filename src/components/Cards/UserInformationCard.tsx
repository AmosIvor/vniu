import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const UserInformationCard = ({ userName, phoneNumber, defaultAddress, onChangeAddress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>User Information</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'column' }}>
          <Text>Name: {userName}</Text>
          <Text>Phone Number: {phoneNumber}</Text>
          <Text>Default Address: {defaultAddress}</Text>
        </View>
        <TouchableOpacity onPress={onChangeAddress} style={styles.button}>
          <Text>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  button: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center'
  }
})

export default UserInformationCard
