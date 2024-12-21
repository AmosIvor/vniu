import { TQueryError } from '@hooks/app/useAppQuery'
import { showToast } from '@hooks/app/useAppToastMessage'
import { StackNavigationState } from '@react-navigation/native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RootStackParamList } from 'src/navigators/RootNavigator'

//dateTime
const relativeTimeFromNow = (dateTime: string | null) => {
  dayjs.extend(relativeTime)
  return dayjs(dateTime).fromNow()
}

const dateFormat = (dateTime: string, type?: string) => {
  if (type) {
    return dayjs(dateTime).format(type)
  }
  return dateTime
}
export const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds)}`
}

//characters

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

//Compare
const deepObjectCompare = (obj1: any, obj2: any) => {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!deepObjectCompare(obj1[key], obj2[key])) {
        return false
      }
    } else if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}
const deepArrayCompare = (arr1: any, arr2: any) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!deepArrayCompare(arr1[i], arr2[i])) {
        return false
      }
    } else if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
      if (!deepObjectCompare(arr1[i], arr2[i])) {
        return false
      }
    } else if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}

const getSearchParamFromURL = (url: string, param: string) => {
  return new URL(url).searchParams.get(param)
}
const isHttpUrl = (url: string): boolean => {
  return /^https?:\/\//i.test(url)
}
const generateRandomId = (): string => Math.random().toString(36).substring(2, 11)

const formatNumberToReadableString = (num: number) => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + 'T'
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B'
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M'
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K'
  } else {
    return num
  }
}
const formatNumberWithCommas = (num: number | undefined) => {
  if (!num) {
    return '$0'
  }
  if (num < 0) {
    return '-$' + (num * -1).toLocaleString()
  } else {
    return '$' + num.toLocaleString()
  }
}

//query

export const showToastQueryError = (error: TQueryError, defaultMessage: string = '') => {
  const message = error.response?.data?.message || error.message || defaultMessage

  showToast('error', message)
}

export const getNestedRouteName = (route: any): string => {
  if (route.state && route.state.routes) {
    const nestedRoute = route.state.routes[route.state.index]
    return getNestedRouteName(nestedRoute)
  } else {
    return route.name
  }
}
export const getNameScreen = (state: StackNavigationState<RootStackParamList>): string => {
  const currentRoute = state.routes[state.index]

  return getNestedRouteName(currentRoute)
}

// wallet number
export const formatWalletNumber = (walletNumber: string): string => {
  if (walletNumber.startsWith('0x')) {
    return `${walletNumber.slice(0, 6)}...${walletNumber.slice(-4)}`
  } else {
    return `*${walletNumber.slice(-4)}`
  }
}

export const Commons = {
  dateTime: {
    relativeTimeFromNow,
    dateFormat
  },
  text: {
    capitalizeFirstLetter
  },
  number: { formatNumberToReadableString, formatNumberWithCommas },

  compare: {
    deepObjectCompare,
    deepArrayCompare
  },
  url: {
    getSearchParamFromURL,
    isHttpUrl
  },
  generate: { generateRandomId },
  query: { showToastQueryError },
  navigation: { getNestedRouteName, getNameScreen }
}
