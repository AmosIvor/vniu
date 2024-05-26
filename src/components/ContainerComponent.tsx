import { useNavigation } from '@react-navigation/native'
import { ReactNode } from 'react'
import { View, ScrollView, ImageBackground, SafeAreaView, Image, StyleProp, ViewStyle } from 'react-native'
import { appColors, appFonts } from '@constants'
import { ArrowLeft } from 'iconsax-react-native'
import { globalStyles } from 'src/styles/globalStyles'
import { CircleComponent, RowComponent, SpaceComponent, TextComponent } from '@components'
import { IMAGES } from '@assets'

interface Props {
  isImageBg?: boolean
  isScroll?: boolean
  title?: string
  children: ReactNode
  isBack?: boolean
  isChat?: boolean
  styles?: StyleProp<ViewStyle>
}

const ContainerComponent = (props: Props) => {
  const { isImageBg, isScroll, title, children, isBack, isChat, styles } = props

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
            styles={[
              {
                paddingHorizontal: 16,
                paddingVertical: 8,
                minWidth: 48,
                minHeight: 48,
                paddingBottom: 14,
                borderBottomWidth: isChat ? 0.2 : 0,
                borderBottomColor: appColors.text2
              }
            ]}
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

            {isChat && (
              <RowComponent>
                <SpaceComponent width={16} />
                <RowComponent>
                  <CircleComponent size={48}>
                    <Image
                      source={IMAGES.avatar}
                      style={{ width: '100%', height: '100%', borderRadius: 100 }}
                      resizeMode='cover'
                    />
                  </CircleComponent>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 100,
                      backgroundColor: '#FF5A5A',
                      position: 'absolute',
                      bottom: 0,
                      right: 2
                    }}
                  />
                </RowComponent>

                <SpaceComponent width={8} />

                <View
                  style={{
                    height: 48,
                    paddingVertical: 2,
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}
                >
                  <TextComponent text='Amos Ivor' font={appFonts.medium} color={appColors.text} size={17} />
                  <TextComponent text='6 hours ago' font={appFonts.regular} color={appColors.text2} size={14} />
                </View>
              </RowComponent>
            )}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    )
  }

  return isImageBg ? (
    <ImageBackground source={require('src/assets/images/splash.png')} style={{ flex: 1 }} imageStyle={{ flex: 1 }}>
      <SafeAreaView style={[globalStyles.container]}>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container, styles]}>{headerComponent()}</SafeAreaView>
  )
}
export default ContainerComponent
