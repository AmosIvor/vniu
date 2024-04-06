import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, ImageBackground, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from '@gorhom/bottom-sheet'
import { Scroll } from 'iconsax-react-native'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']

const product = {
  id: 1,
  name: 'PUMA Everyday Hussle',
  averageRating: 3,
  totalReview: 2,
  sold: 10,
  description:
    'Aute magna dolore sint ipsum dolor fugiat. Ad magna ad elit labore culpa sunt sint laboris consectetur sunt. Lorem excepteur occaecat reprehenderit nostrud culpa ad ex exercitation tempor.',
  productImages: [
    {
      ImageId: 4,
      ProductOptionId: null,
      url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    },
    {
      ImageId: 5,
      ProductOptionId: null,
      url: 'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      ImageId: 6,
      ProductOptionId: null,
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      ImageId: 1,
      ProductOptionId: 1,
      url: 'https://plus.unsplash.com/premium_photo-1674828601017-2b8d4ea90aca?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      ImageId: 2,
      ProductOptionId: 2,
      url: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2811&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      ImageId: 3,
      ProductOptionId: 3,
      url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
    }
  ],
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
  ProductOptionVMs: [
    {
      ProductOptionId: 1,
      Colour: {
        ColourId: 1,
        ColourName: 'Black'
      },
      Size: {
        SizeId: 1,
        SizeName: 'XS'
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      ImageOption:
        'https://plus.unsplash.com/premium_photo-1674828601017-2b8d4ea90aca?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      QuantityInStock: 10
    },
    {
      ProductOptionId: 2,
      Colour: {
        ColourId: 1,
        ColourName: 'Black'
      },
      Size: {
        SizeId: 1,
        SizeName: 'S'
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      ImageOption:
        'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2811&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      QuantityInStock: 10
    },
    {
      ProductOptionId: 1,
      Colour: {
        ColourId: 1,
        ColourName: 'Blue'
      },
      Size: {
        SizeId: 1,
        SizeName: 'XS'
      },
      OriginalPrice: 25000,
      SalePrice: 20000,
      Sold: 3,
      ImageOption:
        'https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
      QuantityInStock: 10
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
  const [selectedImage, setSelectedImage] = useState(product.productImages[0])
  const [selectedOption, setSelectedOption] = useState(product.ProductOptionVMs[0])
  const [selectedSize, setSelectedSize] = useState(null)
  useEffect(() => {
    // Fetch product data from API or other data source
    // fetchProductData(id)
    //   .then((data) => {
    //     setProduct(data);
    //     setSelectedImage(data.productImage);
    //   })
    //   .catch((error) => console.error(error));
  }, [id])
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
            {product.productImages.map((i) => (
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
              {product.averageRating}
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
              {'(' + product.totalReview + ' ) | đã bán ' + product.sold}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600' }}>${selectedOption.OriginalPrice}</Text>
            <View style={{ width: 40, height: 20, borderRadius: 20, backgroundColor: '#888', margin: 2 }}>
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: '600', textAlign: 'center' }}>
                {(selectedOption.SalePrice / selectedOption.OriginalPrice) * 100 + ' % '}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
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
              <View style={{ flex: 1 }}>
                <Image source={{ uri: selectedOption.ImageOption }} style={{ width: 60, height: 60, gap: 10 }} />
              </View>
              <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{ color: colors.text, fontSize: 14 }}>{'Colour, Size'}</Text>
                <Text style={{ color: colors.text, fontSize: 14, fontWeight: '600' }}>
                  {selectedOption.Colour.ColourName + ' , ' + selectedOption.Size.SizeName}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.primary, fontSize: 14 }}>{'Chọn'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

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
// {SIZES.map((s, i) => (
//   <TouchableOpacity
//     key={i}
//     onPress={() => setSize(s)}
//     style={{
//       width: 44,
//       height: 44,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: s === size ? colors.primary : colors.card,
//       borderRadius: 44
//     }}
//   >
//     <Text
//       style={{
//         color: s === size ? colors.card : colors.text,
//         fontWeight: '600',
//         fontSize: 16
//       }}
//     >
//       {s}
//     </Text>
//   </TouchableOpacity>
// ))}
