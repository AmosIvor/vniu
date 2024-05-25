import { IMAGES } from '@assets'
import {
  ButtonComponent,
  CircleComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '@components'
import { appColors, appFonts } from '@constants'
import { Theme, useTheme } from '@react-navigation/native'
import { Bag2, InfoCircle, Lock, LogoutCurve, Moon, Setting2, Verify } from 'iconsax-react-native'
import React, { useContext, useEffect } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from 'src/styles/globalStyles'
import { MenuOptionComponent } from './components'
import { AppContext } from 'src/contexts/app.context'

const ProfileScreen = ({ toggleTheme }: any) => {
  const { colors } = useTheme()
  const { themeTest } = useContext(AppContext)

  return (
    // <View style={styles.container}>
    //   <Text style={{ color: colors.text }}>Profile screen.</Text>
    //   <Button title='Toggle Theme' onPress={toggleTheme} />
    // </View>
    <ContainerComponent styles={{ backgroundColor: colors.background }}>
      <SpaceComponent height={10} />

      {/* header */}
      <SectionComponent>
        <RowComponent styles={{ justifyContent: 'space-between' }}>
          <RowComponent>
            <RowComponent>
              <CircleComponent size={50}>
                <Image
                  source={IMAGES.avatar}
                  style={{ width: '100%', height: '100%', borderRadius: 100 }}
                  resizeMode='cover'
                />
              </CircleComponent>

              <Verify
                size={20}
                variant='Bold'
                color={appColors.active}
                style={{ position: 'absolute', bottom: 0, right: -8 }}
              />
            </RowComponent>

            <SpaceComponent width={14} />

            <View
              style={{
                height: 54,
                justifyContent: 'space-between',
                paddingVertical: 2,
                alignItems: 'flex-start'
              }}
            >
              <TextComponent text='Amos Ivor' font={appFonts.semiBold} color={colors.text} size={19} />

              <TextComponent text='Verified Profile' font={appFonts.regular} color={appColors.text2} size={14} />
            </View>
          </RowComponent>

          <ButtonComponent
            type='primary'
            text='3 orders'
            textStyles={{ fontSize: 14, color: appColors.text }}
            styles={[
              {
                width: 'auto',
                marginBottom: 0,
                backgroundColor: appColors.SilverSand,
                minHeight: 20,
                paddingVertical: 14
              },
              globalStyles.shadow
            ]}
          />
        </RowComponent>
      </SectionComponent>

      <SpaceComponent height={30} />

      <SectionComponent>
        {/* darkmode */}
        <MenuOptionComponent text='Dark Mode' icon={<Moon size={24} color={colors.text} />} isToggle />

        {/* account information */}
        <MenuOptionComponent text='Account Information' icon={<InfoCircle size={24} color={colors.text} />} />

        {/* password */}
        <MenuOptionComponent text='Password' icon={<Lock size={24} color={colors.text} />} />

        {/* order */}
        <MenuOptionComponent text='My Order' icon={<Bag2 size={24} color={colors.text} />} />

        {/* settings */}
        <MenuOptionComponent text='Setting' icon={<Setting2 size={24} color={colors.text} />} />

        <SpaceComponent height={60} />

        {/* logout */}
        <MenuOptionComponent text='Logout' isLogout icon={<LogoutCurve size={24} color={appColors.Red} />} />
      </SectionComponent>
    </ContainerComponent>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default ProfileScreen
