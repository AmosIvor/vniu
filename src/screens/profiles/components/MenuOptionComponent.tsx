import { RowComponent, SpaceComponent, TextComponent } from '@components'
import { appColors, appFonts } from '@constants'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SwitchToggle from 'react-native-switch-toggle'

interface Props {
  isToggle?: boolean
  text: string
  icon: ReactNode
  onPress?: () => void
  isLogout?: boolean
  onPressToggle?: () => void
}

const MenuOptionComponent = (props: Props) => {
  const { isToggle, isLogout, onPress, icon, text, onPressToggle } = props
  return (
    <RowComponent
      styles={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        justifyContent: 'space-between'
      }}
    >
      <TouchableOpacity>
        <RowComponent>
          {/* icon */}
          {icon}

          <SpaceComponent width={18} />

          {/* content */}
          <TextComponent
            text={text}
            color={isLogout ? appColors.Red : appColors.text}
            font={appFonts.semiBold}
            size={19}
          />
        </RowComponent>
      </TouchableOpacity>

      {isToggle && (
        <SwitchToggle
          switchOn={false}
          onPress={onPressToggle ?? (() => {})}
          containerStyle={{
            width: 50,
            height: 24,
            borderRadius: 25,
            padding: 5
          }}
          circleColorOff={appColors.bgPrimary}
          circleColorOn={appColors.primary}
          backgroundColorOn={appColors.bgPrimary}
          backgroundColorOff={appColors.primary}
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
