import { TextComponent } from '@components'
import { ReactNode } from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { appColors } from 'src/constants/appColors'
import { appFonts } from 'src/constants/appFonts'
import { globalStyles } from 'src/styles/globalStyles'

interface Props {
  onPress: () => void
  label: string
  icon?: ReactNode
  textColor?: string
  bgColor?: string
  styles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
}

const TagComponent = (props: Props) => {
  const { onPress, label, icon, textColor, bgColor, styles, textStyles } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.tag,
        {
          backgroundColor: bgColor ? bgColor : appColors.text2
        },
        styles
      ]}
    >
      {icon && icon}
      <TextComponent
        font={appFonts.medium}
        text={label}
        styles={[{ marginLeft: icon ? 8 : 0 }, textStyles]}
        color={textColor ? textColor : bgColor ? appColors.bgPrimary : appColors.gray}
      />
    </TouchableOpacity>
  )
}
export default TagComponent
