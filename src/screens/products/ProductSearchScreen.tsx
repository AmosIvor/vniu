import { ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent } from '@components'
import { SearchNormal, Sort } from 'iconsax-react-native'
import { useState } from 'react'
import { View } from 'react-native'
import { appColors } from 'src/constants/appColors'

const ProductSearchScreen = () => {
  const [search, setSearch] = useState('')

  return (
    <ContainerComponent isScroll isBack isImageBg title='Search products'>
      <SpaceComponent height={10} />

      {/* search-bar */}
      <SectionComponent>
        <RowComponent styles={{ alignItems: 'flex-start' }}>
          <RowComponent styles={{ flex: 1 }}>
            <InputComponent
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder='Search...'
              affix={
                <View style={{}}>
                  <SearchNormal variant='Outline' color={appColors.black} size={24} />
                </View>
              }
              isAllowClear
            />
          </RowComponent>

          <SpaceComponent width={16} />

          <View
            style={{
              borderRadius: 12,
              minHeight: 44,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: appColors.black
            }}
          >
            <Sort size={24} color={appColors.black} />
          </View>
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  )
}
export default ProductSearchScreen
