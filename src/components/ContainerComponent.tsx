import { useNavigation } from '@react-navigation/native'
import { ReactNode } from 'react'
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native'

import { appColors } from 'src/constants.ts/appColors'
import { ArrowLeft } from 'iconsax-react-native'
import { IMAGES } from '@assets/images'
import { globalStyles } from 'src/styles/globalStyles'
import { appFonts } from 'src/constants.ts/appFonts'
import { RowComponent, TextComponent } from '@components'

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
              backgroundColor: 'coral',
              minWidth: 48,
              minHeight: 48
            }}
          >
            {isBack && (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12, backgroundColor: 'red' }}>
                <ArrowLeft size={24} color={appColors.text} />
              </TouchableOpacity>
            )}

            {title && (
              <TextComponent
                text={title ?? ''}
                font={appFonts.medium}
                flex={1}
                styles={{
                  backgroundColor: 'yellow',
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
