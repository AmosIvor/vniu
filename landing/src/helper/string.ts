export const capitalize = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export const formatFullName = (input?: { firstName?: string; lastName?: string }) => {
  if (!input) return ''
  const { firstName, lastName } = input
  if (firstName && lastName) return `${firstName} ${lastName}`
  return `${firstName ?? ''}${lastName ?? ''}`
}

export const formatPrice = (price: number | string) => {
  const numericString = String(price).replace(/[^0-9]/g, '')

  const numericArray = numericString.split('')
  const reversedArray = numericArray.reverse()
  const formattedArray = []
  for (let i = 0; i < reversedArray.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedArray.push(',')
    }
    formattedArray.push(reversedArray[i])
  }
  const formattedString = formattedArray.reverse().join('')

  return formattedString
}

export const formatUSD = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
