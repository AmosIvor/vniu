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
  Image,
  ActivityIndicator
} from 'react-native'
import UserInformationCard from 'src/components/Cards/UserInformationCard'
import { getStringStorage } from 'src/functions/storageFunctions'
import { Dropdown } from 'react-native-element-dropdown'
import AddAddress from 'src/components/AddAddress'
import DropDownPicker from 'react-native-dropdown-picker'
import { useTheme } from '@react-navigation/native'

const OrderScreen = ({ route, navigation }) => {
  const { colors } = useTheme()
  const { itemsToOrder, total } = route.params
  const [showEditModal, setShowEditModal] = useState(false)

  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [shippingMethod, setShippingMethod] = useState([])
  const [selectedShippingMethod, setSelectedShippingMethod] = useState()

  const [paymentType, setPaymentType] = useState([
    { label: 'COD', value: 1 },
    { label: 'BANK_TRANSFER', value: 2 },
    { label: 'CREDIT_CARD', value: 3 },
    { label: 'PAYPAL', value: 4 }
  ])
  const [selectedPaymentType, setSelectedPaymentType] = useState()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const userId = getStringStorage('id')

  const [addressData, setAddressData] = useState(null)
  const [openAddressDropdown, setOpenAddressDropdown] = useState(false)

  useEffect(() => {
    // Fetch user data from API
    fetchAddressData(userId) // Call your API endpoint to fetch user data
    fetchShippingData()
  }, [])

  const fetchAddressData = async (userId) => {
    try {
      const response = await fetch(DATABASE_URL + `/api/UserAddress/${userId}/addresses`)
      const data = await response.json()
      // setAddressData(data.data)
      const dataAddress = data.data.map((item) => ({
        label: `${item.streetNumber}, ${item.unitNumber}, ${item.addressLine1}, ${item.addressLine2}, ${item.city}, ${item.district}`,
        isDefault: item.isDefault,
        value: `${item.streetNumber}, ${item.unitNumber}, ${item.addressLine1}, ${item.addressLine2}, ${item.city}, ${item.district}`,
        id: item.addressId,
        fullAddress: `${item.streetNumber}, ${item.unitNumber}, ${item.addressLine1}, ${item.addressLine2}, ${item.city}, ${item.district}`,
        userName: item.user.userName,
        phoneNumber: item.user.phoneNumber
      }))
      console.log('🚀 ~ dataAddress ~ dataAddress:', dataAddress)
      setAddressData(dataAddress)

      const defaultAddresses = dataAddress.find((address) => address.isDefault)
      setAddress(defaultAddresses.fullAddress)
      setUserName(defaultAddresses.userName) // Access the userName from the first element of userDetails
      setPhoneNumber(defaultAddresses.phoneNumber) // Access the phoneNumber from the first element of userDetails
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
  const handlePaymentTypeSelect = (method) => {
    setSelectedPaymentType(method)
  }
  const handleSave = () => {
    // Handle saving logic here
    console.log('User Name:', userName)
    console.log('Phone Number:', phoneNumber)
    console.log('Selected Address:', address)
    handleCloseEditModal()
  }

  const handleCompleteOrder = () => {
    if (userName && phoneNumber && address) {
      const orderData = {
        userName,
        phoneNumber,
        address,
        selectedShippingMethod,
        note,
        selectedPaymentType,
        itemsToOrder,
        userId,
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
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleCloseEditModal} style={styles.closeButton}>
              <Text style={{ color: colors.text }}>X</Text>
            </TouchableOpacity>
            <Text style={{ color: colors.text }}>Edit User Information</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder='User Name'
              placeholderTextColor={colors.text}
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder='Phone Number'
              placeholderTextColor={colors.text}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType='phone-pad'
            />
            <Text style={{ color: colors.text }}>Select Address</Text>
            <DropDownPicker
              open={openAddressDropdown}
              value={address}
              items={addressData}
              setOpen={setOpenAddressDropdown}
              setValue={setAddress}
              setItems={setAddressData}
              placeholder='Select an address'
              placeholderStyle={{ color: colors.text }}
              loading={false} // You can set this to true if you are fetching data
              ActivityIndicatorComponent={() => <ActivityIndicator size='small' color='#0000ff' />}
            />
            <View style={{ gap: 5 }}>
              <Button
                title='Thêm địa chỉ'
                onPress={() => {
                  setIsModalOpen(true)
                }}
              />

              {isModalOpen && <AddAddress isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
              <Button title='Save' onPress={handleSave} />
            </View>
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
              <Text style={{ color: colors.text }}>{item.productItemVM.productName}</Text>
              <Text style={{ color: colors.text }}>Quantity: {item.quantity}</Text>
              <Text style={{ color: colors.text }}>Price: ${item.productItemVM.salePrice}</Text>
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
              <Text style={{ color: colors.text }}>
                {'Shipping Method: $' + selectedShippingMethod?.shippingMethodPrice || 2}
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholder='Select Shipping Method'
                placeholderStyle={{ color: colors.text }}
                data={shippingMethod}
                value={selectedShippingMethod}
                labelField='shippingMethodName'
                valueField='shippingMethodId'
                onChange={(method) => handleShippingMethodSelect(method)}
              />
            </View>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder='Note'
              placeholderTextColor={colors.text}
              value={note}
              onChangeText={setNote}
            />
            <View style={styles.dropdownContainer}>
              <Text style={{ color: colors.text }}>Payment Method:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder='Select Payment Tyle'
                placeholderStyle={{ color: colors.text }}
                data={paymentType}
                value={selectedPaymentType}
                labelField='label'
                valueField='value'
                onChange={(method) => handlePaymentTypeSelect(method)}
              />
            </View>
          </View>
        }
      />
      <View style={styles.bottomMenu}>
        <Text style={[styles.totalPrice, { color: colors.text }]}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.completeOrderButton} onPress={handleCompleteOrder}>
          <Text style={[styles.completeOrderButtonText, { color: colors.text }]}>Complete Order</Text>
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
    width: '100%',
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },

  selectedAddress: {
    backgroundColor: 'lightblue'
  }
})
