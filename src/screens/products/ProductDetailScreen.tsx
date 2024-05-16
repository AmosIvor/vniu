import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

const product = {
  id: 1,
  name: 'PUMA Everyday Hussle',
  totalReview: 2,
  description:
    'Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt. Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.',
  reviews: [
    {
      id: 1,
      rating: 3,
      comment:
        'Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt. Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.',
      user: {
        id: 1,
        name: 'John Doe',
        avatar:
          'https://randomuser.https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
      },
      image:
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      id: 2,
      rating: 5,
      comment:
        'Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt. Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.',
      user: {
        id: 1,
        name: 'John Doe',
        avatar:
          'https://randomuser.me/api/portraitshttps://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
      },
      image:
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    }
  ],
  ProductItems: [
    {
      ProductItemId: 1,
      ProductItemName: 'PUMA Everyday',
      Colour: {
        ColourId: 1,
        ColourName: 'Black'
      },
      Variation: {
        Size: {
          SizeId: 1,
          SizeName: 'S'
        },
        QuantityInStock: 10
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      Rating: 3,
      ProductImages: [
        {
          ImageId: 1,
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
          ImageId: 2,
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
          ImageId: 3,
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        },
        {
          ImageId: 4,
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        }
      ]
    },
    {
      ProductItemId: 2,
      Colour: {
        ColourId: 1,
        ColourName: 'Black'
      },
      Variation: {
        Size: {
          SizeId: 1,
          SizeName: 'XL'
        },
        QuantityInStock: 10
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      Rating: 3,
      ProductImages: [
        {
          ImageId: 1,
          url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        }
      ]
    },
    {
      ProductItemId: 3,
      Colour: {
        ColourId: 1,
        ColourName: 'Red'
      },
      Variation: {
        Size: {
          SizeId: 1,
          SizeName: 'XXL'
        },
        QuantityInStock: 10
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      Rating: 4,
      ProductImages: [
        {
          ImageId: 1,
          url: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2811&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      ]
    }
  ]
}

const ProductDetailScreen = ({
  navigation,
  route: {
    params: { id }
  }
}: RootStackScreenProps<'Details'>) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  const [count, setCount] = useState(1)
  const [size, setSize] = useState(SIZES[0])
  // const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product.ProductItems[0].ProductImages[0])
  const [selectedItem, setSelectedItem] = useState(product.ProductItems[0])
  const [isFocus, setIsFocus] = useState(false)
  const [optionData, setOptionData] = useState([])
  const [option, setOption] = useState(null)
  const [optionName, setOptionName] = useState(null)
  useEffect(() => {
    const options = product.ProductItems.map((item) => {
      const { ProductItemId } = item
      const { SizeName } = item.Variation.Size
      const { ColourName } = item.Colour
      const OptionName = `${ColourName} - ${SizeName}`

      return {
        ProductItemId,
        SizeName,
        ColourName,
        OptionName
      }
    })
    setOptionData(options)
  }, [product.ProductItems])
  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, flexDirection: 'column', flexGrow: 1 }}>
        <ImageBackground
          style={{ height: 300, width: '100%', justifyContent: 'flex-end' }}
          source={{
            uri: selectedImage.url
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
        {/* <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
        }}
      />
      <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <StatusBar barStyle={'dark-content'} />

        
      </SafeAreaView> */}

        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6, gap: 6 }}>
            {selectedItem.ProductImages.map((i) => (
              <TouchableOpacity
                key={i.ImageId}
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
                <Image source={{ uri: i.url }} style={{ width: 100, height: 100 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>PUMA Everyday Hussle</Text>

          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.text,
                opacity: 0.5
              }}
            >
              {selectedItem.Rating}
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
              {'(' + product.totalReview + ' ) | đã bán ' + selectedItem.Sold}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>${selectedItem.OriginalPrice}</Text>
            <View style={{ width: 40, height: 20, borderRadius: 20, backgroundColor: '#888', margin: 2 }}>
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: '600', textAlign: 'center' }}>
                {(selectedItem.SalePrice / selectedItem.OriginalPrice) * 100 + ' % '}
              </Text>
            </View>
          </View>
          {/* <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => console.log('Select size')}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height: 80,
                width: '100%',
                gap: 6,
                backgroundColor: colors.background,
                padding: 6,
                borderRadius: 5,
                borderColor: colors.border,
                borderWidth: 1
              }}
            >
              
              <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{ color: colors.text, fontSize: 14 }}>{'Colour, Size'}</Text>
                <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>
                  {selectedItem.Colour.ColourName + ' , ' + selectedItem.Variation.Size.SizeName}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>{'Chọn'}</Text>
              </View>
            </TouchableOpacity>
          </View>*/}
        </View>

        {/* DropDownMenuOption */}

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={{ color: 'black', opacity: 0.5, fontSize: 14 }}
          selectedTextStyle={{ color: 'black', opacity: 0.5, fontSize: 14 }}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={optionData}
          search
          maxHeight={300}
          labelField='OptionName'
          valueField='OptionName'
          placeholder={!isFocus ? 'Select option' : '...'}
          searchPlaceholder='Search...'
          value={'Select option'}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setOption(item.label)
            setOptionName(item.value)
            const t = item
            const foundItem = product.ProductItems.find((i) => i.ProductItemId === parseInt(t.ProductItemId))
            if (foundItem) {
              setSelectedImage(foundItem.ProductImages[0]) // Set the first image as the selectedImage
              setSelectedItem(foundItem) // Set the foundItem as the selectedItem
            }
            console.log(selectedItem)

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
            Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt.
            Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.
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
