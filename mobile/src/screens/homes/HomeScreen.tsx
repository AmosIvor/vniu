import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ENV } from '@configs/env'
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { ICONS, IMAGES } from '@assets'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { FilterView } from '@components'
import { appColors } from '@constants'
import { TabsStackScreenProps } from 'src/navigators/TabsNavigator'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const fetchProducts = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://10.0.2.2:5000/api/Product`, {
    params: {
      page: pageParam,
      pageSize: 4
    }
  })
  console.log('🚀 ~ fetchProducts ~ response:', response)

  return response.data
}

const HomeScreen = ({ navigation }: TabsStackScreenProps<'Home'>) => {
  const { colors } = useTheme()
  const [categoryIndex, setCategoryIndex] = useState(0)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length * 4 < lastPage.totalCount) {
        return pages.length + 1
      }
      return undefined
    }
  })
  console.log('🚀 ~ HomeScreen ~ data:', data)
  console.log('🚀 ~ HomeScreen ~ data:', data)

  // if (isLoading)
  //   return (
  //     <ActivityIndicator
  //       style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
  //       size='large'
  //       color='#0000ff'
  //     />
  //   )
  // if (isError) return <Text>Error: {error.message}</Text>

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

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
      <Text style={{ marginTop: 5, color: colors.text, fontSize: 12 }}>{item.name}</Text>
    </View>
  )
  const products = data?.pages.flatMap((page) => page.data) || []

  const renderItem = ({ item }: { item: any }) => {
    const productItem = item.productItems[0]
    const productImageUrl = productItem?.productImage?.productImageUrl
    const salePrice = productItem?.salePrice
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
          ${originalPrice}{' '}
          <Text style={styles.discount}>
            {'- ' + Math.round(((originalPrice - salePrice) / originalPrice) * 100) + ' %'}
          </Text>
        </Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name='star' size={16} color='#333' />
          <Text style={{ marginLeft: 4, fontWeight: 'bold', color: colors.text }}>{rating}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>VNIU</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreen')}
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
            onPress={() => navigation.navigate('ImageSearch')}
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

        {/* FilterView */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            gap: 12,
            alignItems: 'flex-end',
            alignContent: 'flex-end',
            alignSelf: 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52
            }}
          >
            <MaterialCommunityIcons name='sort' size={24} color='#333' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 52
            }}
          >
            <MaterialCommunityIcons name='filter' size={24} color='#333' />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoryIcons}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryIcon}
            contentContainerStyle={styles.categoryContainer}
          />
        </View>

        {/* Product List */}
        {/* <ScrollView horizontal={true} style={{ flex: 1, width: '100%', paddingLeft: '5%' }}>
          <View>
            <FlatList
              numColumns={2}
              showsVerticalScrollIndicator
              // data={data.pages[0]?.data}
              data={products}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                return isFetchingNextPage ? <ActivityIndicator /> : null
              }}
            />
          </View>
        </ScrollView> */}
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
            size='large'
            color='#0000ff'
          />
        ) : isError ? null : (
          <ScrollView scrollEnabled={false} horizontal={true} style={{ flex: 1, width: '100%', padding: wp(1) }}>
            <View>
              <FlatList
                numColumns={2}
                showsVerticalScrollIndicator
                // data={data.pages[0]?.data}
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => {
                  return isFetchingNextPage ? <ActivityIndicator /> : null
                }}
              />
            </View>
          </ScrollView>
        )}
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
    width: wp(48),
    // width: 160,
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
