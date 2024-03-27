import { TextComponent } from '@components'
import { ReactNode } from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { appColors } from 'src/constants/appColors'
import { appFonts } from 'src/constants/appFonts'
import { globalStyles } from 'src/styles/globalStyles'

interface Props {
  icon?: ReactNode
  text?: string
  type?: 'primary' | 'text' | 'link'
  color?: string
  styles?: StyleProp<ViewStyle>
  textColor?: string
  textStyles?: StyleProp<TextStyle>
  textFont?: string
  onPress?: () => void
  iconFlex?: 'right' | 'left'
  isDisable?: boolean
}

const ButtonComponent = (props: Props) => {
  const { icon, text, textColor, textFont, textStyles, color, iconFlex, isDisable, onPress, styles, type } = props

  return type === 'primary' ? (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        disabled={isDisable}
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color ? color : isDisable ? appColors.text2 : appColors.primary,
            marginBottom: 10,
            width: '100%'
          },
          styles
        ]}
      >
        {icon && iconFlex === 'left' && icon}
        {text && (
          <TextComponent
            text={text}
            color={textColor ?? appColors.bgPrimary}
            styles={[
              textStyles,
              {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center'
              }
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
            font={textFont ?? appFonts.medium}
          />
        )}
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      {icon && icon}
      {text && <TextComponent flex={0} text={text} color={type === 'link' ? appColors.primary : appColors.text} />}
    </TouchableOpacity>
  )
}
export default ButtonComponent
