import { RowComponent, SpaceComponent, TextComponent } from '@components'
import { appColors, appFonts, appThemes } from '@constants'
import { AppContext } from '@contexts'
import { useTheme } from '@react-navigation/native'
import { ReactNode, useContext, useMemo } from 'react'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SwitchToggle from 'react-native-switch-toggle'

interface Props {
  isToggle?: boolean
  text: string
  icon: ReactNode
  onPress?: () => void
  isLogout?: boolean
}

const MenuOptionComponent = (props: Props) => {
  const { isToggle, isLogout, onPress, icon, text } = props
  const { themeTest, setThemeTest } = useContext(AppContext)
  const { colors } = useTheme()
  const isSwitchOn = useMemo(() => (themeTest === 'light' ? false : true), [themeTest])
  const onPressToggle = () => {
    setThemeTest((prevTheme) => (prevTheme === appThemes.light ? appThemes.dark : appThemes.light))
  }
  const action = () => {
    Alert.alert('Coming soon')
  }
  return (
    <RowComponent
      styles={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: 'space-between'
      }}
    >
      <TouchableOpacity onPress={onPress ? onPress : action}>
        <RowComponent>
          {/* icon */}
          {icon}

          <SpaceComponent width={18} />

          {/* content */}
          <TextComponent
            text={text}
            color={isLogout ? appColors.Red : colors.text}
            font={appFonts.semiBold}
            size={19}
          />
        </RowComponent>
      </TouchableOpacity>

      {isToggle && (
        <SwitchToggle
          switchOn={isSwitchOn}
          // onPress={onPressToggle ?? (() => {})}
          onPress={onPressToggle}
          containerStyle={{
            width: 50,
            height: 24,
            borderRadius: 25,
            padding: 5
          }}
          circleColorOff={appColors.bgPrimary}
          circleColorOn={appColors.primary}
          backgroundColorOn={appColors.bgPrimary}
          backgroundColorOff={appColors.SilverSand}
          circleStyle={{
            width: 16,
            height: 16,
            borderRadius: 20
          }}
        />
      )}
    </RowComponent>
  )
}
export default MenuOptionComponent
