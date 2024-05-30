import React, { useState } from 'react'
import { View, Button, Image, ActivityIndicator, Text, StyleSheet, Alert } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwhzyu0oo/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'ma9g4xzz'
const FASTAPI_URL = 'http://10.0.2.2:8000/search/'

const ImageSearchScreen = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
      .then((image) => {
        setImage(image.path)
        uploadImage(image)
      })
      .catch((err) => {
        console.log('ImagePicker Error: ', err)
      })
  }

  const uploadImage = (image) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: 'uploaded_image.jpg'
    })
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    formData.append('cloud_name', 'dwhzyu0oo')

    console.log('🚀 ~ uploadImage ~ formData:', formData)

    fetch('https://api.cloudinary.com/v1_1/dwhzyu0oo/image/upload', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        searchImage(data.url)
        console.log(data)
      })
      .catch((error) => {
        Alert.alert('Error While Uploading')
      })
  }
  const searchImage = (imageUrl) => {
    const params = new URLSearchParams()
    params.append('url', imageUrl) // 'url' should be replaced with the actual field name expected by the server

    fetch(FASTAPI_URL, {
      method: 'POST',
      body: params.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('🚀 ~ .then ~ data:', data)
        setResults(data.nearest_images)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }
  return (
    <View style={styles.container}>
      <Button title='Pick Image' onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size='large' color='#0000ff' />}
      {results && (
        <View>
          <Text>Search Results:</Text>
          {results.map((result, index) => (
            <Text key={index}>
              {result[0]} - {result[1]}
            </Text>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20
  }
})

export default ImageSearchScreen
