import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native'
import { getRequest, postRequest } from 'src/utils/fetch' // Adjust the import based on your project structure
import { useQueryClient } from '@tanstack/react-query' // If you use react-query
import { getStringStorage } from 'src/functions/storageFunctions'
import { DATABASE_URL } from 'react-native-dotenv'
import DropDownPicker from 'react-native-dropdown-picker'

import db from 'src/assets/datas/db.json'
const AddAddress = ({ isModalOpen, setIsModalOpen }) => {
  const userId = getStringStorage('id')
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const [isLoadingProvince, setIsLoadingProvince] = useState(false)
  const [isLoadingDistrict, setIsLoadingDistrict] = useState(false)

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])

  const [streetNumber, setStreetNumber] = useState('')
  const [unitNumber, setUnitNumber] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const [openProvince, setOpenProvince] = useState(true) // Always open
  const [openDistrict, setOpenDistrict] = useState(false)

  useEffect(() => {
    async function fetchProvinces() {
      setIsLoadingProvince(true)
      try {
        // Simulate API call by using local data
        const data = db.province
        setProvinces(data.map((p) => ({ label: p.name, value: p.idProvince })))
      } catch (error) {
        console.error('Fetch GET error:', error)
        Alert.alert('Error', `Failed to fetch provinces: ${error.message}`)
      } finally {
        setIsLoadingProvince(false)
      }
    }
    fetchProvinces()
  }, [])

  useEffect(() => {
    async function fetchDistricts() {
      if (!selectedProvince) return
      setIsLoadingDistrict(true)
      try {
        // Simulate API call by using local data
        const data = db.district.filter((d) => d.idProvince === selectedProvince)
        setDistricts(data.map((d) => ({ label: d.name, value: d.idDistrict })))
      } catch (error) {
        console.error('Fetch GET error:', error)
        Alert.alert('Error', `Failed to fetch districts: ${error.message}`)
      } finally {
        setIsLoadingDistrict(false)
        setOpenDistrict(true) // Open district dropdown
      }
    }
    fetchDistricts()
  }, [selectedProvince])

  const handleSubmit = async () => {
    setIsLoading(true)

    // Create the request body
    const formData = {
      city: provinces.find((province) => province.value === selectedProvince)?.label,
      district: districts.find((district) => district.value === selectedDistrict)?.label,
      streetNumber,
      unitNumber,
      addressLine1,
      addressLine2
    }
    console.log('🚀 ~ handleSubmit ~ formData:', formData)

    try {
      const response = await fetch(DATABASE_URL + '/api/Address/' + userId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const res = await response.json()

      console.log('🚀 ~ handleSubmit ~ res:', res)

      if (!response.ok) {
        throw new Error(res.message || 'Something went wrong!')
      }
      if (res.message === 'Create address successfully') {
        queryClient.invalidateQueries('addresses')
        setIsModalOpen(false)
      } else {
        Alert.alert('Error', res.message)
      }

      // Handle the successful response here (e.g., show a success message, navigate to another screen, etc.)
    } catch (error) {
      console.error('🚀 ~ handleSubmit ~ error:', error)
      // Handle error here (e.g., show an error message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal visible={isModalOpen} animationType='slide' transparent={true}>
      <View style={styles.modalContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add Address</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.selectContainer}>
                <Text>City, Province</Text>
                <DropDownPicker
                  open={openProvince}
                  value={selectedProvince}
                  items={provinces}
                  setOpen={setOpenProvince}
                  setValue={setSelectedProvince}
                  setItems={setProvinces}
                  loading={isLoadingProvince}
                  disabled={false}
                  ActivityIndicatorComponent={() => <ActivityIndicator size='small' color='#0000ff' />}
                />
              </View>

              <View style={styles.selectContainer}>
                <Text>District</Text>
                <DropDownPicker
                  open={openDistrict}
                  value={selectedDistrict}
                  items={districts}
                  setOpen={setOpenDistrict}
                  setValue={setSelectedDistrict}
                  setItems={setDistricts}
                  loading={isLoadingDistrict}
                  ActivityIndicatorComponent={() => <ActivityIndicator size='small' color='#0000ff' />}
                  disabled={!selectedProvince}
                />
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder='Street Number'
              value={streetNumber}
              onChangeText={setStreetNumber}
            />
            <TextInput style={styles.input} placeholder='Unit Number' value={unitNumber} onChangeText={setUnitNumber} />
            <TextInput
              style={styles.input}
              placeholder='Address Line 1'
              value={addressLine1}
              onChangeText={setAddressLine1}
            />
            <TextInput
              style={styles.input}
              placeholder='Address Line 2'
              value={addressLine2}
              onChangeText={setAddressLine2}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  )
}

export default AddAddress

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  selectContainer: {
    width: '50%',
    marginBottom: 20
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  selectedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#e6f7ff'
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
