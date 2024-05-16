import { TextComponent } from '@components'
import { View, Text, Modal, ActivityIndicator } from 'react-native'
import { appColors } from 'src/constants/appColors'

interface Props {
  isVisible: boolean
  message?: string
}

const ModalLoading = (props: Props) => {
  const { isVisible, message } = props

  return (
    <Modal visible={isVisible} style={{ flex: 1 }} transparent statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: appColors.modal, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={appColors.black} size={32} />
        <TextComponent text='Loading' flex={0} color={appColors.black} />
      </View>
    </Modal>
  )
}
export default ModalLoading
