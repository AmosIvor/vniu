import { ReactNode } from 'react'
import { View, Text, StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import { appColors } from 'src/constants/appColors'

interface Props {
  size?: number
  children: ReactNode
  color?: string
  onPress?: () => void
  styles?: StyleProp<ViewStyle>
}

const CircleComponent = (props: Props) => {
  const { size, children, color, onPress, styles } = props

  const localStyle: StyleProp<ViewStyle> = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColors.text2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  }

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[localStyle, styles]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyle, styles]}>{children}</View>
  )
}
export default CircleComponent
