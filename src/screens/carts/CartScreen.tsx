import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LOCAL_URL } from 'react-native-dotenv'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getStringStorage } from 'src/functions/storageFunctions'
import { TabsStackScreenProps } from 'src/navigators/TabsNavigator'

const CartScreen = ({ navigation }: TabsStackScreenProps<'Cart'>) => {
  const userId = getStringStorage('id')
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${LOCAL_URL}/api/CartItem/${userId}`)
      const data = await response.json()
      setCartItems(data.data)
      console.log('🚀 ~ fetchCartItems ~ data.data:', data.data)
    } catch (error) {
      console.error('Error fetching cart items:', error)
    }
  }

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      await fetch(`${LOCAL_URL}/api/CartItem/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      })
      // Update local state to reflect changes
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item))
      )
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const renderCartItem = ({ item }) => {
    const product = item.productItemVM // Adjust this based on your data structure
    const { productName, productImages } = product // Adjust these fields based on your data structure
    const quantity = item.quantity // Correct extraction of quantity
    const variation = item.variationVM // Correct extraction of variation

    // For simplicity, only consider the first image and variation
    const imageUrl = productImages[0]?.productImageUrl
    const size = variation.size // Correct extraction of size

    const variationName = size.sizeName

    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.productVariation}>Variation: {variationName}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.cartItemId, Math.max(1, quantity - 1))}
            >
              <MaterialCommunityIcons name='minus' size={20} color='black' />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.cartItemId, quantity + 1)}
            >
              <MaterialCommunityIcons name='plus' size={20} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartItemId.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cartList: {
    padding: 16
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8
  },
  productDetails: {
    flex: 1
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  productVariation: {
    fontSize: 14,
    marginBottom: 8
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8
  }
})
