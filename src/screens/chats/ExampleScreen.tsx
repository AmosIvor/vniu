// import { useCallback, useEffect, useState } from 'react'
// import { View, Text, ScrollView, StatusBar } from 'react-native'
// import { GiftedChat, IMessage } from 'react-native-gifted-chat'
// import messagesData from '@assets/datas/messages.json'

import React, { useCallback, useEffect, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Bubble, GiftedChat, IMessage, Send } from 'react-native-gifted-chat'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import messagesData from '@assets/datas/messages.json'

// const ExampleScreen = () => {
//   const [messages, setMessages] = useState<IMessage[]>([])

//   useEffect(() => {
//     console.log('into')
//     setMessages([
//       ...messagesData.map((msg) => {
//         return {
//           _id: msg.id,
//           text: msg.msg,
//           createdAt: new Date(msg.date),
//           user: {
//             _id: msg.from,
//             name: msg.from ? 'You' : 'Bob'
//           }
//         }
//       }),
//       {
//         _id: 0,
//         system: true,
//         text: 'All your base are belong to us',
//         createdAt: new Date(),
//         user: {
//           _id: 0,
//           name: 'Bot'
//         }
//       }
//     ])
//   }, [])

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages: any[]) => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//     <ScrollView style={{ paddingTop: StatusBar.currentHeight, backgroundColor: 'coral' }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages: any) => onSend(messages)}
//         user={{
//           _id: 1
//         }}
//       />
//     </ScrollView>
//   )
// }
// export default ExampleScreen

const ExampleScreen = () => {
  // const [messages, setMessages] = useState([
  //   {
  //     _id: 1,
  //     text: 'Welcome !',
  //     createdAt: new Date(),
  //     user: {
  //       _id: 1,
  //       name: 'UserChar',
  //       avatar: ''
  //     },
  //     image: '',
  //     file: ''
  //   }
  // ])

  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    console.log('into')
    setMessages([
      ...messagesData.map((msg) => {
        return {
          _id: msg.id,
          text: msg.msg,
          createdAt: new Date(msg.date),
          user: {
            _id: msg.from,
            name: msg.from ? 'You' : 'Bob'
          }
        }
      }),
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot'
        }
      }
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={styles.container}>
      <NavBar />
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ExampleScreen

export function NavBar() {
  if (Platform.OS === 'web') {
    return null
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'blue',
        alignItems: 'center'
      }}
    >
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>💬 Gifted Chat{'\n'}</Text>
    </SafeAreaView>
  )
}
