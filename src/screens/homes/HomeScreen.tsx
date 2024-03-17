import { IMG_Product } from '@assets/images'
import React from 'react'
import { StyleSheet, View, Text, FlatList, Image, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { IC_Jeans, IC_Pants, IC_Shirt, IC_Shorts, IC_T_shirt } from '@assets/icons'
const ShoppingScreen = () => {
  const productList = [
    { id: '1', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 },
    { id: '2', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 },
    { id: '3', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 },
    { id: '4', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 },
    { id: '5', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 },
    { id: '6', name: 'Loose open shirt', price: 10.7, discount: 33, rating: 4.8, soldCount: 1200, colors: 8, sizes: 4 }
    // Add more product objects as needed
  ]

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>VNIU</Text>
        <View style={styles.searchContainer}>
          <EvilIcon name='search' size={24} color='#333' />
          <Text style={styles.searchText}>Search...</Text>
        </View>
        <View style={styles.profileIcon}>
          <MaterialCommunityIcons name='image-search-outline' size={24} color='#333' />
        </View>
      </View>

      {/* Category Icons */}
      <View style={styles.categoryContainer}>
        <MaterialCommunityIcons name='view-module' size={24} color='#333' />
        <Image source={IC_Shirt} style={{ width: 20, height: 20 }} />
        <Image source={IC_T_shirt} style={{ width: 20, height: 20 }} />
        <Image source={IC_Jeans} style={{ width: 20, height: 20 }} />
        <Image source={IC_Pants} style={{ width: 20, height: 20 }} />
        <Image source={IC_Shorts} style={{ width: 20, height: 20 }} />
      </View>

      {/* Product List */}
      {/* <ScrollView> */}
      <FlatList
        data={productList}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={IMG_Product} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>
              ${item.price} <Text style={styles.discount}>-{item.discount}%</Text>
            </Text>
            <View style={styles.productDetails}>
              <Text>{item.colors} colors</Text>
              <Text>{item.sizes} sizes</Text>
            </View>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name='star' size={16} color='#333' />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.soldCount}>{item.soldCount} solded</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e0e0e0'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  searchText: {
    marginLeft: 8,
    color: '#333'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  productContainer: {
    width: '50%',
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
  }
})

export default ShoppingScreen
