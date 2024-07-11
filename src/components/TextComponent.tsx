import { StyleProp, Text, TextStyle } from 'react-native'
import { appColors } from 'src/constants/appColors'
import { appFonts } from 'src/constants/appFonts'
import { globalStyles } from 'src/styles/globalStyles'

interface Props {
  text: string
  color?: string
  size?: number
  font?: string
  flex?: number
  styles?: StyleProp<TextStyle>
  isTitle?: boolean
  numberOfLine?: number
}

const TextComponent = (props: Props) => {
  const { text, color, size, font, flex, styles, isTitle, numberOfLine } = props

  return (
    <Text
      numberOfLines={numberOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          flex: flex ?? 0,
          fontSize: size ? size : isTitle ? 24 : 14,
          fontFamily: font ? font : isTitle ? appFonts.medium : appFonts.regular
        },
        styles
      ]}
    >
      {text}
    </Text>
  )
}
export default TextComponent
