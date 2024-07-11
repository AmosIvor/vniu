// fetch.js

export const getRequest = async ({ endPoint }) => {
  try {
    const response = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch GET error:', error)
    return null
  }
}

export const postRequest = async ({ endPoint, formData }) => {
  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Fetch POST error:', error)
    return null
  }
}
