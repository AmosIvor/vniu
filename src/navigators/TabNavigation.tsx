import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

import CUSTOM_COLOR from '../constants/colors.js'
import HomeScreen from '@screens/homes/HomeScreen.tsx'
import CartScreen from '@screens/carts/CartScreen.tsx'
import AssistScreen from '@screens/assists/AssistScreen.tsx'
import ChatScreen from '@screens/chats/ChatScreen.tsx'
import ProfileScreen from '@screens/profiles/ProfileScreen.tsx'

const ProfileStack = createNativeStackNavigator()

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator initialRouteName='ProfileScreen' screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} />
      {/* <ProfileStack.Screen name="History" component={History} /> */}
    </ProfileStack.Navigator>
  )
}

const HomeStack = createNativeStackNavigator()

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
    </HomeStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator()

const TabNavigation = () => {
  const navigation = useNavigation()

  return (
    <Tab.Navigator initialRouteName='HomeStack' activeColor={CUSTOM_COLOR.Primary} barStyle={styles.barStyle}>
      <Tab.Screen
        name='HomeStack'
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={26} />
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='cart' color={color} size={26} />
        }}
      />

      <Tab.Screen
        name='AssistScreen'
        component={AssistScreen}
        options={{
          tabBarLabel: 'Assist',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='robot-happy-outline' color={color} size={26} />
        }}
      />
      <Tab.Screen
        name='ChatScreen'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='chat-processing-outline' color={color} size={26} />
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='account' color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
  barStyle: {
    position: 'absolute',
    backgroundColor: CUSTOM_COLOR.White,
    height: 90,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Ink,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    zIndex: 2,
    top: '90%',
    overflow: 'hidden'
  }
})
