import { ContainerComponent, TextComponent } from '@components'
import { View, Text, StatusBar } from 'react-native'
import { globalStyles } from 'src/styles/globalStyles'

const ProductSearchScreen = () => {
  return (
    <ContainerComponent isScroll isBack isImageBg title='Hello'>
      <TextComponent text='Hello' />
    </ContainerComponent>
  )
}
export default ProductSearchScreen
