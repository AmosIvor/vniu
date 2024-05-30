import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { DATABASE_URL, LOCAL_URL } from 'react-native-dotenv'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const ProductDetailScreen = ({
  navigation,
  route: {
    params: { id }
  }
}: RootStackScreenProps<'Details'>) => {
  const { colors } = useTheme()
  const [product, setProduct] = useState()
  const insets = useSafeAreaInsets()
  const [count, setCount] = useState(1)
  const [size, setSize] = useState(SIZES[0])
  const [selectedImage, setSelectedImage] = useState()
  const [selectedItem, setSelectedItem] = useState()
  const [isFocus, setIsFocus] = useState(false)
  const [optionData, setOptionData] = useState([])
  const [option, setOption] = useState(null)
  const [optionName, setOptionName] = useState(null)

  const fetchProduct = async () => {
    const response = await axios.get(LOCAL_URL + `/api/Product/` + id)
    setProduct(response.data.data)

    const options = response.data.data.productItems.map((item) => {
      const { productItemId } = item
      const { sizeName } = item.variations[0].size
      const { colourName } = item.colourVMs[0]
      const optionName = `${colourName} - ${sizeName}`

      return {
        productItemId,
        sizeName,
        colourName,
        optionName
      }
    })
    setOptionData(options)
    setSelectedImage(response.data.data.productItems[0].productImages[0])
    setSelectedItem(response.data.data.productItems[0])
    return response.data
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, flexDirection: 'column', flexGrow: 1 }}>
        <ImageBackground
          style={{ height: 300, width: '100%', justifyContent: 'flex-end' }}
          source={{
            uri: selectedImage?.productImageUrl
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              gap: 8
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: '#fff'
              }}
            >
              <MaterialCommunityIcons name='keyboard-backspace' size={24} color={'#fff'} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: '#fff'
              }}
            >
              <MaterialCommunityIcons name='cards-heart-outline' size={24} color={'#fff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 52,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 52,
                borderWidth: 1,
                borderColor: '#fff'
              }}
            >
              <MaterialCommunityIcons name='cart' size={24} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6, gap: 6 }}>
            {selectedItem?.productImages.map((i) => (
              <TouchableOpacity
                key={i.productImageId}
                onPress={() => setSelectedImage(i)}
                style={{
                  width: 100,
                  height: 100,
                  margin: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'black',
                  borderWidth: 1
                }}
              >
                <Image source={{ uri: i.productImageUrl }} style={{ width: 100, height: 100 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>{product?.productName}</Text>

          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
                opacity: 0.5
              }}
            >
              {3}
            </Text>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {new Array(5).fill('').map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name={i < 3 ? 'star-check' : 'star-outline'}
                  color='#facc15'
                  size={20}
                />
              ))}
            </View>
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
                opacity: 0.5
              }}
            >
              {'(' + 3 + ' ) | đã bán ' + selectedItem?.productItemSold}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>${selectedItem?.originalPrice}</Text>
            <View style={{ width: 40, height: 20, borderRadius: 20, backgroundColor: '#888', margin: 2 }}>
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: '600', textAlign: 'center' }}>
                {'- ' +
                  Math.round(
                    ((selectedItem?.originalPrice - selectedItem?.salePrice) / selectedItem?.originalPrice) * 100
                  ) +
                  ' %'}
              </Text>
            </View>
          </View>
        </View>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={{ color: 'black', opacity: 0.5, fontSize: 14 }}
          selectedTextStyle={{ color: 'black', opacity: 0.5, fontSize: 14 }}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={optionData}
          search
          maxHeight={300}
          labelField='optionName'
          valueField='optionName'
          placeholder={!isFocus ? 'Select option' : '...'}
          searchPlaceholder='Search...'
          value={optionName}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setOption(item.optionName)
            setOptionName(item.optionName)
            const foundItem = product.productItems.find((i) => i.productItemId === item.productItemId)
            if (foundItem) {
              setSelectedImage(foundItem.productImages[0])
              setSelectedItem(foundItem)
            }
            setIsFocus(false)
          }}
        />

        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 6,
              color: colors.text
            }}
          >
            Description
          </Text>
          <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={3}>
            {product?.productDescription}
          </Text>

          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexDirection: 'row',
                padding: 12
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.background,
                  paddingHorizontal: 16
                }}
              >
                Add to cart
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <MaterialCommunityIcons name='cart' size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProductDetailScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#533483',
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center'
  },
  dropdown: {
    color: 'black',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  icon: {
    marginRight: 5
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
})
