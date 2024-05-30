import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Alert
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import { DATABASE_URL, LOCAL_URL } from 'react-native-dotenv'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwhzyu0oo/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'ma9g4xzz'
const FASTAPI_URL = 'https://vniuimagesearch.azurewebsites.net/search/'

const ImageSearchScreen = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
      .then((image) => {
        setImage(image.path)
        uploadImage(image)
      })
      .catch((err) => {
        console.log('ImagePicker Error: ', err)
      })
  }

  const uploadImage = (image) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: 'uploaded_image.jpg'
    })
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('cloud_name', 'dwhzyu0oo')

    fetch('https://api.cloudinary.com/v1_1/dwhzyu0oo/image/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        searchImage(data.url)
      })
      .catch((error) => {
        Alert.alert('Error While Uploading')
      })
  }
  const searchImage = (imageUrl) => {
    const params = new URLSearchParams()
    params.append('url', imageUrl)

    fetch(FASTAPI_URL, {
      method: 'POST',
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('🚀 ~ .then ~ data:', data)
        const productItemIds = data.nearest_images.map((result) => result[1])
        const uniqueProductItemIds = [...new Set(productItemIds)] // Loại bỏ trùng lặp
        fetchProducts(uniqueProductItemIds)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  const fetchProducts = (productItemIds) => {
    fetch(LOCAL_URL + '/api/Product/get-products-by-ids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productItemIds)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched products:', data)
        setResults(data.data)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }
  const renderItem = ({ item }: { item: any }) => {
    const productItem = item.productItems[0]
    const productImageUrl = productItem?.productImage?.productImageUrl
    const originalPrice = productItem?.originalPrice
    const discount = 5
    const rating = 5

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {
            id: item.productId
          })
        }}
        style={styles.productContainer}
      >
        <Image source={{ uri: productImageUrl }} style={styles.productImage} />
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 8, color: colors.text }}>{item.productName}</Text>
        <Text style={{ fontSize: 14, marginTop: 4, color: colors.text }}>
          ${originalPrice} <Text style={styles.discount}>-{discount}%</Text>
        </Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name='star' size={16} color='#333' />
          <Text style={{ marginLeft: 4, fontWeight: 'bold', color: colors.text }}>{rating}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}> IMAGE SEARCH</Text>
      <View style={styles.pickImageContainer}>
        <Text style={styles.instruction}>Please pick an image</Text>
        <Button title='Pick Image' onPress={pickImage} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
      {results && (
        <ScrollView horizontal={true} style={{ flex: 1, width: '100%', paddingLeft: '5%' }}>
          <View>
            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20
  },
  pickImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  instruction: {
    fontSize: 16,
    marginRight: 10
  },
  resultItem: {
    margin: 10,
    alignItems: 'center'
  },
  resultImage: {
    width: 100,
    height: 100
  },
  productListContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  productListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  productContainer: {
    width: 160,
    padding: 8
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4
  },
  discount: {
    color: 'green'
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold'
  },
  soldCount: {
    marginLeft: 8,
    color: '#888'
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  header: {
    width: '90%',
    margin: 50,
    height: 50,
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: '2%',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  text: {
    left: 10
  },
  search: {
    position: 'relative',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default ImageSearchScreen
