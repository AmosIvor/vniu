import { ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '@components'
import { appColors, appFonts } from '@constants'
import { TickSquare } from 'iconsax-react-native'
import { TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
const DonePaymentScreen = ({ navigation }: RootStackScreenProps<'DonePaymentScreen'>) => {
  return (
    <ContainerComponent styles={{ flex: 1 }}>
      <SectionComponent styles={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TickSquare size={60} color={appColors.active} />
        <SpaceComponent height={30} />
        <TextComponent text='Payment Successfully' font={appFonts.regular} size={24} color={appColors.text} />
        <TouchableOpacity onPress={() => navigation.navigate('TabsStack', { screen: 'Home' })}>
          <TextComponent text='Back to Home' font={appFonts.regular} size={16} color={appColors.primary} />
        </TouchableOpacity>
      </SectionComponent>
    </ContainerComponent>
  )
}
export default DonePaymentScreen
