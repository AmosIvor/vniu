import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getStringStorage } from 'src/functions/storageFunctions'
import { LOCAL_URL } from 'react-native-dotenv'
import CheckBox from '@react-native-community/checkbox'
import { RootStackScreenProps } from 'src/navigators/RootNavigator'
import { useTheme } from '@react-navigation/native'

const OrderHistoryScreen = ({ navigation }: RootStackScreenProps<'OrderHistory'>) => {
  const { colors } = useTheme()
  const userId = getStringStorage('id')
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${LOCAL_URL}/api/Order/orders/${userId}`)
      const data = await response.json()
      setOrders(data.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleSelectOrder = (order) => {
    setSelectedOrder(order)
  }

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => handleSelectOrder(item)}>
      <Text style={[styles.orderId, { color: colors.text }]}>Order ID: {item.orderId}</Text>
      <Text style={[styles.orderTotal, { color: colors.text }]}>Total: ${item.orderTotal}</Text>
      <Text style={[styles.orderDate, { color: colors.text }]}>
        Date: {new Date(item.orderCreateAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  )

  const renderOrderLineItem = ({ item }) => {
    const product = item.productItem
    const { productName, productImages, salePrice } = product
    const imageUrl = productImages[0]?.productImageUrl
    const variationName = item.variation.size.sizeName

    return (
      <View style={styles.orderLineItem}>
        <Image source={{ uri: imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={[styles.productName, { color: colors.text }]}>{productName}</Text>
          <Text style={[styles.productVariation, { color: colors.text }]}>Variation: {variationName}</Text>
          <Text style={[styles.quantity, { color: colors.text }]}>Quantity: {item.quantity}</Text>
          <Text style={[styles.price, { color: colors.text }]}>Price: ${salePrice}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginVertical: 16, alignContent: 'center', gap: 50, margin: 5 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'gray',
            borderRadius: 15
          }}
        >
          <MaterialCommunityIcons name='keyboard-backspace' size={24} color='black' />
        </TouchableOpacity>
        <Text
          style={{ color: colors.text, fontSize: 24, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center' }}
        >
          Order History
        </Text>
      </View>
      {selectedOrder ? (
        <>
          <FlatList
            data={selectedOrder.orderLines}
            keyExtractor={(item) => item.orderLineId.toString()}
            renderItem={renderOrderLineItem}
            contentContainerStyle={styles.orderLineList}
          />
          <Button title='Back to Orders' onPress={() => setSelectedOrder(null)} />
        </>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.orderList}
        />
      )}
    </SafeAreaView>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  orderList: {
    padding: 16
  },
  orderItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  orderTotal: {
    fontSize: 14
  },
  orderDate: {
    fontSize: 12
  },
  orderLineList: {
    padding: 16
  },
  orderLineItem: {
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
    fontSize: 12
  },
  quantity: {
    fontSize: 14
  },
  price: {
    fontSize: 14
  }
})
