import { chatApi } from '@apis'
import { MessageResponseType } from '@appTypes/chat.type'
import { ContainerComponent } from '@components'
import { appColors } from '@constants'
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Bubble,
  BubbleProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send as SendGiftedChat,
  SendProps,
  SystemMessage
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { globalStyles } from 'src/styles/globalStyles'

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [text, setText] = useState('')
  const userId = 'CS0003'

  const [connection, setConnection] = useState<null | HubConnection>(null)

  const insets = useSafeAreaInsets()

  const { data: chatRoomData } = useQuery({
    queryKey: ['chatroom', userId],
    queryFn: () => chatApi.getChatRoomByUser(userId)
  })

  const { data: messagesData } = useQuery({
    queryKey: ['message', userId],
    queryFn: () => chatApi.getMessagesByUser(userId)
  })

  const sendMessageMutation = useMutation({
    mutationFn: chatApi.sendMessageByUser
  })

  useEffect(() => {
    if (messagesData) {
      console.log(messagesData)
      setMessages([
        ...messagesData.data.data.map((msg) => {
          return {
            _id: msg.messageId,
            text: msg.messageContent,
            createdAt: new Date(msg.messageCreateAt),
            user: {
              _id: msg.isFromUser === true ? 1 : 0,
              name: msg.isFromUser ? 'You' : 'Admin'
            }
          }
        })
      ])
    }
  }, [messagesData])

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      // .withUrl('http://10.0.2.2:5000/chathub', {
      .withUrl('https://vniuapi20240429122410.azurewebsites.net/chathub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build()
    setConnection(connect)

    // return () => {
    //   if (connect) {
    //     connect.stop().catch((error) => console.log('Error stopping connection:', error))
    //   }
    // }
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message: MessageResponseType) => {
            // handle chatroom id by checking chatroom id
            console.log(chatRoomData)
            const messageCustom = [
              {
                _id: message.messageId,
                text: message.messageContent,
                createdAt: new Date(message.messageCreateAt),
                user: {
                  _id: message.isFromUser === true ? 1 : 0,
                  name: message.isFromUser ? 'You' : 'Admin'
                }
              }
            ]
            console.log('message', message)
            // setMessages((prevMessages) => [...prevMessages, messageCustom])
            setMessages((prevMessage) => GiftedChat.append(prevMessage, messageCustom))
          })

          // connection.off('ReceiveMessage')
        })
        .catch((error) => console.log(error))
    }
    // return () => {
    //   if (connection) {
    //     connection.off('ReceiveMessage')
    //     connection.stop().catch((error) => console.log('Error stopping connection:', error))
    //   }
    // }
  }, [connection, userId])

  const onSend = useCallback((messages: IMessage[]) => {
    // setMessages((prevMsg) => GiftedChat.append(prevMsg, messages))
    // console.log(messages)
    sendMessageMutation.mutate(
      {
        userId,
        body: {
          isFromUser: true,
          isRead: true,
          messageContent: messages[0].text,
          imageUrl: messages[0].image
        }
      },
      {
        onSuccess: (data) => {
          console.log(data.data.data)
        },
        onError: (error) => {
          console.log(error)
        }
      }
    )
  }, [])

  const renderInputToolbar = (props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: appColors.bgPrimary, borderWidth: 1 }}
        renderActions={() => (
          <View style={{ height: 49, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name='add' color={appColors.primary} size={28} />
          </View>
        )}
      />
    )
  }

  const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: appColors.bgPrimary
          }
        }}
        wrapperStyle={{
          left: [
            {
              backgroundColor: '#fff'
            },
            globalStyles.shadow
          ],
          right: [
            {
              backgroundColor: appColors.primary
            },
            globalStyles.shadow
          ]
        }}
      />
    )
  }

  const renderSend = (props: SendProps<IMessage>) => (
    <View
      style={{
        height: 49,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 14
      }}
    >
      {/* {text === '' && (
        <>
          <Ionicons name='camera-outline' color={appColors.primary} size={28} />
          <Ionicons name='mic-outline' color={appColors.primary} size={28} />
        </>
      )} */}
      {text !== '' && (
        <SendGiftedChat
          {...props}
          containerStyle={{
            justifyContent: 'center'
          }}
        >
          <Ionicons name='send' color={appColors.primary} size={28} />
        </SendGiftedChat>
      )}
    </View>
  )

  return (
    <>
      <ContainerComponent isBack isChat>
        {/* chat-message */}
        <View style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: appColors.gray }}>
          <GiftedChat
            messages={messages}
            onSend={(messages: any) => onSend(messages)}
            onInputTextChanged={setText}
            user={{
              _id: 1
            }}
            renderSystemMessage={(props) => <SystemMessage {...props} textStyle={{ color: appColors.gray }} />}
            renderSend={renderSend}
            renderBubble={renderBubble}
            // renderInputToolbar={renderInputToolbar}

            textInputProps={styles.composer}
            maxComposerHeight={100}
            bottomOffset={insets.bottom}
            scrollToBottom
          />
        </View>
      </ContainerComponent>
    </>
  )
}
export default ChatScreen

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: appColors.text2,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginTop: 4,
    marginBottom: 4
  }
})
