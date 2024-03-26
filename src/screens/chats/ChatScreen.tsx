import messagesData from '@assets/datas/messages.json'
import { ContainerComponent } from '@components'
import { Camera, Send, Sticker } from 'iconsax-react-native'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send as SendGiftedChat,
  SystemMessage
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { appColors } from 'src/constants/appColors'
import { appInfors } from 'src/constants/appInfors'

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [text, setText] = useState('')

  const insets = useSafeAreaInsets()

  useEffect(() => {
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

  const handleInputText = (text: string) => {
    setInputMessage(text)
  }

  const onSend = useCallback((messages = []) => {
    setMessages((prevMsg) => GiftedChat.append(prevMsg, messages))
    console.log(messages)
  }, [])

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: appColors.bgPrimary }}
        renderActions={() => (
          <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
            <Ionicons name='add' color={appColors.primary} size={28} />
          </View>
        )}
      />
    )
  }

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#000'
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff'
          },
          right: {
            backgroundColor: 'coral'
          }
        }}
      />
    )
  }

  const renderSend = (props: any) => (
    <View
      style={{
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 14
      }}
    >
      {text === '' && (
        <>
          <Ionicons name='camera-outline' color={appColors.primary} size={28} />
          <Ionicons name='mic-outline' color={appColors.primary} size={28} />
        </>
      )}
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
        <View style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: 'green' }}>
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
            renderInputToolbar={renderInputToolbar}
            textInputProps={styles.composer}
            maxComposerHeight={100}
            bottomOffset={insets.bottom}
            scrollToBottom
          />
        </View>

        {/* input bar */}
        <View style={[styles.inputContainer]}>
          <View style={[styles.inputMessageContainer]}>
            <TextInput
              style={[styles.input]}
              placeholder='Type here...'
              placeholderTextColor={appColors.black}
              value={inputMessage}
              onChangeText={handleInputText}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity>
                <Camera size={22} variant='Outline' color={appColors.black} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Sticker size={22} variant='Outline' color={appColors.black} />
              </TouchableOpacity>
            </View>

            {/* button-send */}
            <TouchableOpacity style={[styles.buttonSend]}>
              <Send size={22} variant='Bold' color={appColors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </ContainerComponent>
    </>
  )
}
export default ChatScreen

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'coral',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputMessageContainer: {
    height: 54,
    width: appInfors.sizes.WIDTH - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appColors.bgPrimary,
    borderRadius: 12,
    borderColor: 'rgba(128, 128, 128, 0.4)',
    borderWidth: 1
  },

  input: {
    color: appColors.text,
    flex: 1,
    paddingHorizontal: 10
  },

  buttonSend: {
    backgroundColor: appColors.bgPrimary,
    padding: 4,
    borderRadius: 100,
    marginHorizontal: 6
  },

  composer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: appColors.black,
    paddingHorizontal: 10,
    paddingTop: 8,
    fontSize: 16,
    marginVertical: 4
  }
})
