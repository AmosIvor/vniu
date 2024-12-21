import React from 'react'
import ContainerComponent from '@components/ContainerComponent'
import SectionComponent from '@components/SectionComponent'
import { useQueryClient } from '@tanstack/react-query'
import { TickSquare } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { getStringStorage } from 'src/functions/storageFunctions'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
import { appColors } from '@constants/appColors'
import SpaceComponent from '@components/SpaceComponent'
import TextComponent from '@components/TextComponent'
import { appFonts } from '@constants/appFonts'
const userId = getStringStorage('id')

const DonePaymentScreen = ({ navigation }: RootStackScreenProps<'DonePaymentScreen'>) => {
  const queryClient = useQueryClient()

  return (
    <ContainerComponent styles={{ flex: 1 }}>
      <SectionComponent styles={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TickSquare size={60} color={appColors.active} />
        <SpaceComponent height={30} />
        <TextComponent text='Payment Successfully' font={appFonts.regular} size={24} color={appColors.text} />
        <TouchableOpacity
          onPress={() => {
            queryClient.invalidateQueries('cartItems', userId)
            queryClient.invalidateQueries('orders', userId)
            navigation.navigate('TabsStack', { screen: 'Home' })
          }}
        >
          <TextComponent text='Back to Home' font={appFonts.regular} size={16} color={appColors.primary} />
        </TouchableOpacity>
      </SectionComponent>
    </ContainerComponent>
  )
}
export default DonePaymentScreen
