import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const ProfileScreen = ({ toggleTheme }: any) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Profile screen.</Text>
      <Button title='Toggle Theme' onPress={toggleTheme} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default ProfileScreen
