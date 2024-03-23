import { useNavigation } from '@react-navigation/native'
import { ReactNode } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'

import { appColors } from 'src/constants/appColors'
import { ArrowLeft } from 'iconsax-react-native'
import { IMAGES } from '@assets/images'
import { globalStyles } from 'src/styles/globalStyles'
import { appFonts } from 'src/constants/appFonts'
import { CircleComponent, RowComponent, TextComponent } from '@components'

interface Props {
  isImageBg?: boolean
  isScroll?: boolean
  title?: string
  children: ReactNode
  isBack?: boolean
}

const ContainerComponent = (props: Props) => {
  const { isImageBg, isScroll, title, children, isBack } = props

  const navigation: any = useNavigation()

  const returnContainer = isScroll ? (
    <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  )

  const headerComponent = () => {
    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        {(title || isBack) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              minWidth: 48,
              minHeight: 48
            }}
          >
            {isBack && (
              <CircleComponent size={34} onPress={() => console.log('hello')} styles={{ marginRight: 12, zIndex: 1 }}>
                <ArrowLeft size={24} color={appColors.text} />
              </CircleComponent>
            )}

            {title && (
              <TextComponent
                text={title ?? ''}
                font={appFonts.medium}
                flex={1}
                styles={{
                  marginLeft: -46,
                  textAlign: 'center'
                }}
                size={22}
              />
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    )
  }

  return isImageBg ? (
    <ImageBackground source={IMAGES.splash} style={{ flex: 1 }} imageStyle={{ flex: 1 }}>
      <SafeAreaView style={[globalStyles.container]}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>{headerComponent()}</SafeAreaView>
  )
}
export default ContainerComponent
