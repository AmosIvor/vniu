import React from 'react'
import { ModalFiltering } from '@modals'
import { SearchNormal, Sort } from 'iconsax-react-native'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ContainerComponent from '@components/ContainerComponent'
import SpaceComponent from '@components/SpaceComponent'
import SectionComponent from '@components/SectionComponent'
import RowComponent from '@components/RowComponent'
import InputComponent from '@components/InputComponent'
import { appColors } from '@constants/appColors'
import TextComponent from '@components/TextComponent'
import { appFonts } from '@constants/appFonts'

const ProductSearchScreen = () => {
  const [search, setSearch] = useState('')
  const [isShowModalFilter, setIsShowModalFilter] = useState(false)

  return (
    <ContainerComponent isBack isImageBg title='Search products'>
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

          <TouchableOpacity
            style={{
              borderRadius: 12,
              minHeight: 44,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: appColors.black
            }}
            onPress={() => setIsShowModalFilter(true)}
          >
            <Sort size={24} color={appColors.black} />
          </TouchableOpacity>
        </RowComponent>
        <ModalFiltering isVisible={isShowModalFilter} onClosed={() => setIsShowModalFilter(false)} />
      </SectionComponent>

      <SectionComponent>
        <TextComponent font={appFonts.medium} size={20} text='Hello' />
        <TextComponent font={appFonts.regular} size={20} text='Hello' />
      </SectionComponent>
    </ContainerComponent>
  )
}
export default ProductSearchScreen
