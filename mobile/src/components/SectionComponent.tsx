import { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { globalStyles } from 'src/styles/globalStyles'

interface Props {
  children: ReactNode
  styles?: StyleProp<ViewStyle>
}

const SectionComponent = (props: Props) => {
  const { children, styles } = props

  return <View style={[globalStyles.section, styles]}>{children}</View>
}
export default SectionComponent
