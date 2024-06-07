import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getStringStorage } from 'src/functions/storageFunctions'
import { LOCAL_URL } from 'react-native-dotenv'
import CheckBox from '@react-native-community/checkbox'
import { TabsStackScreenProps } from 'src/navigators/TabsNavigator'
import { useTheme } from '@react-navigation/native'

const CartScreen = ({ navigation }: TabsStackScreenProps<'Cart'>) => {
  const { colors } = useTheme()
  const userId = getStringStorage('id')
  const [cartItems, setCartItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${LOCAL_URL}/api/CartItem/${userId}`)
      const data = await response.json()
      console.log('🚀 ~ fetchCartItems ~ data:', data)
      setCartItems(data.data)
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

  const handleSelectItem = (cartItemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(cartItemId) ? prevSelected.filter((id) => id !== cartItemId) : [...prevSelected, cartItemId]
    )
  }

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartItems.find((item) => item.cartItemId === itemId)
      return total + item.productItemVM.salePrice * item.quantity
    }, 0)
  }

  const handleOrder = () => {
    const itemsToOrder = cartItems.filter((item) => selectedItems.includes(item.cartItemId))
    navigation.navigate('OrderScreen', { itemsToOrder, total: calculateTotalPrice() })
  }
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number)
  }
  const renderCartItem = ({ item }) => {
    const product = item.productItemVM // Adjust this based on your data structure
    const { productName, productImages, salePrice } = product // Adjust these fields based on your data structure
    const quantity = item.quantity // Correct extraction of quantity
    const variation = item.variationVM // Correct extraction of variation

    // For simplicity, only consider the first image and variation
    const imageUrl = productImages[0]?.productImageUrl
    const size = variation.size // Correct extraction of size

    const variationName = size.sizeName

    return (
      <View style={styles.cartItem}>
        <CheckBox
          style={{ backgroundColor: colors.border, borderWidth: 2 }}
          value={selectedItems.includes(item.cartItemId)}
          onValueChange={() => handleSelectItem(item.cartItemId)}
        />
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={[styles.productName, { color: colors.text }]}>{productName}</Text>
          <View style={styles.quantityContainer}>
            <Text style={[styles.productVariation, { color: colors.text }]}>Variation: {variationName}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.cartItemId, Math.max(1, quantity - 1))}
              >
                <MaterialCommunityIcons name='minus' size={20} color='black' />
              </TouchableOpacity>
              <Text style={[styles.quantity, { color: colors.text }]}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.cartItemId, quantity + 1)}
              >
                <MaterialCommunityIcons name='plus' size={20} color='black' />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.productVariation, { color: colors.text }]}>$ {formatNumber(salePrice)}</Text>
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
      <View style={styles.bottomMenu}>
        <Text style={[styles.totalPrice, { color: colors.text }]}>Total: ${formatNumber(calculateTotalPrice())}</Text>
        <Button title='Order' onPress={handleOrder} />
      </View>
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
    padding: 8,
    alignItems: 'center'
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
    fontSize: 12
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8
  },
  bottomMenu: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
