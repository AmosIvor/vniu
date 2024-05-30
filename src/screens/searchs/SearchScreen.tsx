import React, { useState, useEffect } from 'react'
import { View, TextInput, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet, Text } from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { DATABASE_URL, LOCAL_URL } from 'react-native-dotenv'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { useTheme } from '@react-navigation/native'

const SearchScreen = () => {
  const { colors } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [products, setProducts] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${LOCAL_URL}/api/Product/get-all`, {
          //   headers: {
          //     Authorization: `Bearer ${accessToken}`
          //   }
        })
        setProducts(response.data.data)
      } catch (error) {
        console.log('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])
  const filteredproducts = products.filter((products) => {
    return products.productName.toLowerCase().includes(searchQuery.toLowerCase())
  })
  const searchproducts = (query) => {
    // Gọi API tìm kiếm ở đây và cập nhật kết quả tìm kiếm
    setSearchResults(filteredproducts)
  }

  const handleSearch = (text) => {
    setSearchQuery(text)
    searchproducts(text)
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput
            placeholder='Search'
            style={styles.search}
            onChangeText={handleSearch}
            value={searchQuery}
            hitSlop={{ top: 20, bottom: 20, left: 100, right: 50 }}
          />
        </View>
        <EvilIcon name='search' size={24} color={colors.text} style={{ opacity: 0.5 }} />
      </View>
      <ScrollView horizontal={true} style={{ flex: 1, width: '100%', paddingLeft: '5%' }}>
        <View>
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
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
    marginBottom: '2%',
    flexDirection: 'row',
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
  image: {
    position: 'absolute',
    height: 20,
    width: 20,
    zIndex: 3,
    left: '90%'
  },
  list: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
export default SearchScreen
