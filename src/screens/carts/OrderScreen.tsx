import { DATABASE_URL } from 'react-native-dotenv'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  Modal,
  Image
} from 'react-native'
import UserInformationCard from 'src/components/Cards/UserInformationCard'
import { getStringStorage } from 'src/functions/storageFunctions'
import { Dropdown } from 'react-native-element-dropdown'

const OrderScreen = ({ route, navigation }) => {
  const { itemsToOrder, total } = route.params
  const [showEditModal, setShowEditModal] = useState(false)

  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [shippingMethod, setShippingMethod] = useState([])
  const [selectedShippingMethod, setSelectedShippingMethod] = useState()
  const [note, setNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Credit Card')
  const userId = getStringStorage('id')

  const [addressData, setAddressData] = useState(null)

  useEffect(() => {
    // Fetch user data from API
    fetchAddressData(userId) // Call your API endpoint to fetch user data
    fetchShippingData()
  }, [])

  const fetchAddressData = async (userId) => {
    try {
      const response = await fetch(DATABASE_URL + `/api/UserAddress/${userId}/addresses`)
      const data = await response.json()
      setAddressData(data.data)
      const defaultAddresses = data.data.filter((address) => address.isDefault)
      console.log('🚀 ~ fetchAddressData ~ defaultAddresses:', defaultAddresses)
      console.log('🚀 ~ fetchAddressData ~ defaultAddresses.streetNumber:', defaultAddresses.streetNumber)
      const AddressDetails = defaultAddresses.map((address) => ({
        streetNumber: address.streetNumber,
        unitNumber: address.unitNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        district: address.district
      }))

      const addressParts = []
      AddressDetails.forEach((address) => {
        if (address.streetNumber) addressParts.push(address.streetNumber)
        if (address.unitNumber) addressParts.push(address.unitNumber)
        if (address.addressLine1) addressParts.push(address.addressLine1)
        if (address.addressLine2) addressParts.push(address.addressLine2)
        if (address.city) addressParts.push(address.city)
        if (address.district) addressParts.push(address.district)
      })

      const addressString = addressParts.join(', ')
      const userDetails = defaultAddresses.map((address) => ({
        userName: address.user.userName,
        phoneNumber: address.user.phoneNumber
      }))

      // Assuming userDetails has only one element for the sake of this example
      if (userDetails.length > 0) {
        setAddress(addressString)
        setUserName(userDetails[0].userName) // Access the userName from the first element of userDetails
        setPhoneNumber(userDetails[0].phoneNumber) // Access the phoneNumber from the first element of userDetails
      }
      setAddress(addressString)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }
  //Fetch Shipping

  const fetchShippingData = async () => {
    try {
      const response = await fetch(DATABASE_URL + `/api/ShippingMethod/get-all`)
      const data = await response.json()
      setShippingMethod(data.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleOpenEditModal = () => {
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }
  const handleChangeAddress = () => {
    handleOpenEditModal()
  }
  const handleShippingMethodSelect = (method) => {
    setSelectedShippingMethod(method)
  }
  const handleCompleteOrder = () => {
    if (userName && phoneNumber && address) {
      const orderData = {
        userName,
        phoneNumber,
        address,
        shippingMethod,
        note,
        paymentMethod,
        itemsToOrder,
        total
      }
      console.log('Order Data:', orderData)
      // Here you would typically send the orderData to your backend for processing
      // After successful processing, you might navigate to a success screen or perform other actions
      Alert.alert('Order completed successfully!')
    } else {
      Alert.alert('Please fill out all required fields.')
    }
  }

  return (
    <View style={styles.container}>
      <Modal animationType='slide' transparent={true} visible={showEditModal} onRequestClose={handleCloseEditModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={handleCloseEditModal} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {/* Content for editing user information */}
            <Text>Edit User Information</Text>
            {/* Add tabs for editing name, phone number, address, etc. */}
          </View>
        </View>
      </Modal>
      <FlatList
        data={itemsToOrder}
        keyExtractor={(item) => item.cartItemId.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.productItemVM.productImages[0]?.productImageUrl }} style={styles.productImage} />

            <View style={styles.orderItem}>
              <Text>{item.productItemVM.productName}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.productItemVM.salePrice}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={
          <View>
            {addressData && (
              <UserInformationCard
                userName={userName}
                phoneNumber={phoneNumber}
                defaultAddress={address}
                onChangeAddress={handleChangeAddress}
              />
            )}
            <View style={styles.dropdownContainer}>
              <Text>{'Shipping Method: $' + selectedShippingMethod?.shippingMethodPrice || 2}</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder='Select Shipping Method'
                data={shippingMethod}
                value={selectedShippingMethod}
                labelField='shippingMethodName'
                valueField='shippingMethodId'
                onChange={(method) => handleShippingMethodSelect(method)}
              />
            </View>
            <TextInput style={styles.input} placeholder='Note' value={note} onChangeText={setNote} />
            <View style={styles.dropdownContainer}>
              <Text>Payment Method:</Text>
              <TouchableOpacity onPress={() => setPaymentMethod('Credit Card')}>
                <Text style={paymentMethod === 'Credit Card' ? styles.selected : styles.unselected}>Credit Card</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaymentMethod('PayPal')}>
                <Text style={paymentMethod === 'PayPal' ? styles.selected : styles.unselected}>PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPaymentMethod('Cash')}>
                <Text style={paymentMethod === 'Cash' ? styles.selected : styles.unselected}>Cash</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      <View style={styles.bottomMenu}>
        <Text style={styles.totalPrice}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.completeOrderButton} onPress={handleCompleteOrder}>
          <Text style={styles.completeOrderButtonText}>Complete Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  addressInput: {
    flex: 1
  },
  addressButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 8
  },
  dropdownContainer: {
    marginBottom: 16
  },
  selected: {
    fontWeight: 'bold',
    color: 'blue'
  },
  unselected: {
    color: 'gray'
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
  orderItem: {
    paddingBottom: 8,
    marginBottom: 8
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
  },
  completeOrderButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8
  },
  completeOrderButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  editButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5
  },
  closeButton: {
    alignSelf: 'flex-end'
  }
})
