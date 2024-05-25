import { TextComponent } from '@components'
import { ReactNode } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
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
  isFullWidth?: boolean
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    textColor,
    textFont,
    textStyles,
    color,
    iconFlex,
    isDisable,
    onPress,
    styles,
    type,
    isFullWidth
  } = props

  const viewStyle = isFullWidth ? '100%' : 'auto'

  return type === 'primary' ? (
    <View style={{ alignItems: 'center', width: viewStyle }}>
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
              {
                marginLeft: icon ? 12 : 0,
                fontSize: 16,
                textAlign: 'center'
              },
              textStyles
            ]}
            flex={icon && iconFlex === 'right' ? 1 : 0}
            font={textFont ?? appFonts.medium}
          />
        )}
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress} style={styles}>
      {icon && icon}
      {text && <TextComponent flex={0} text={text} color={type === 'link' ? appColors.primary : appColors.text} />}
    </TouchableOpacity>
  )
}
export default ButtonComponent
