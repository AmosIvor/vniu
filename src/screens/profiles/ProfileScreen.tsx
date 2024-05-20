import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { getStringStorage, removeStorage } from 'src/functions/storageFunctions'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'

const ProfileScreen = ({ navigation }: RootStackScreenProps<'TabsStack'>, { toggleTheme }: any) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Profile screen.</Text>
      <Button title='Toggle Theme' onPress={toggleTheme} />

      <Text style={{ color: colors.text }}>Logout out</Text>
      <Button
        title='Logout'
        onPress={() => {
          removeStorage('accessToken')
          navigation.navigate('SignInScreen')
        }}
      />
      <Text style={{ color: colors.text }}>Print Token</Text>
      <Button
        title='Print Token'
        onPress={() => {
          console.log("🚀 ~ ProfileScreen ~  getStringStorage('accessToken'):", getStringStorage('accessToken'))
        }}
      />
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
