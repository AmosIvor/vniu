import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { ICONS, IMAGES } from '@assets'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FilterView } from '@components'
import { appColors } from '@constants'
import { TabsStackScreenProps } from 'src/navigators/TabsNavigator'
const HomeScreen = ({ navigation }: TabsStackScreenProps<'Home'>) => {
  const { colors } = useTheme()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const categoryIcons = [
    { id: '1', icon: ICONS.icAll, name: 'All' },
    { id: '2', icon: ICONS.icShirt, name: 'Shirt' },
    { id: '3', icon: ICONS.icTshirt, name: 'T-shirt' },
    { id: '4', icon: ICONS.icJeans, name: 'Jeans' },
    { id: '5', icon: ICONS.icPants, name: 'Pants' },
    { id: '6', icon: ICONS.icShorts, name: 'Shorts' }
  ]

  const renderCategoryIcon = ({ item }: { item: any }) => (
    <View style={styles.categoryItem}>
      <Image source={item.icon} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  )
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
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>VNIU</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              paddingHorizontal: 24,
              flexDirection: 'row',
              gap: 12
            }}
          >
            <EvilIcon name='search' size={24} color={colors.text} style={{ opacity: 0.5 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5
              }}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52,
              backgroundColor: colors.primary
            }}
          >
            <MaterialCommunityIcons name='image-search-outline' size={24} color='#333' />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoryIcons}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryIcon}
          contentContainerStyle={styles.categoryContainer}
        />

        {/* Product List */}
        <ScrollView contentContainerStyle={styles.productListContainer}>
          <View style={styles.productListWrapper}>
            {productList.map((product) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', {
                    id: '123'
                  })
                }}
                key={product.id}
                style={styles.productContainer}
              >
                <Image source={IMAGES.product} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  ${product.price} <Text style={styles.discount}>-{product.discount}%</Text>
                </Text>
                <View style={styles.productDetails}>
                  <Text>{product.colors} colors</Text>
                  <Text>{product.sizes} sizes</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons name='star' size={16} color='#333' />
                  <Text style={styles.rating}>{product.rating}</Text>
                  <Text style={styles.soldCount}>{product.soldCount} solded</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ height: 50 }} />
      </SafeAreaView>
      <BottomSheetModal
        snapPoints={['85%']}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <View />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary
        }}
      >
        <FilterView />
      </BottomSheetModal>
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
    paddingVertical: 12
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.Primary
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
  // categoryContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   paddingVertical: 12,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#e0e0e0'
  // },

  categoryContainer: {
    alignItems: 'center',
    paddingVertical: 8
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  categoryImage: {
    width: 50,
    height: 50
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12
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
    width: '48%',
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

export default HomeScreen
