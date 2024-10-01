import { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
import { globalStyles } from 'src/styles/globalStyles'

interface Props {
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | undefined
  styles?: StyleProp<ViewStyle>
  children: ReactNode
  onPress?: () => void
}

const RowComponent = (props: Props) => {
  const { justify, styles, children, onPress } = props
  const localStyle: StyleProp<ViewStyle>[] = [globalStyles.row, { justifyContent: justify }, styles]

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={localStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyle}>{children}</View>
  )
}
export default RowComponent
