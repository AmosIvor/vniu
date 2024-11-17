import Toast from 'react-native-toast-message'

import { useCallback, useRef } from 'react'

import { TMessageType } from '@components/base/ToastMessage/type'

const topOffset = 0

export const useAppToastMessage = () => {
  const isToastShowing = useRef(false)
  const toastTimeout = useRef<NodeJS.Timeout | null>(null)

  const showToast = useCallback((toastType?: TMessageType, message?: string) => {
    if (isToastShowing.current) {
      Toast.hide()
      if (toastTimeout.current) {
        clearTimeout(toastTimeout.current)
      }
      toastTimeout.current = setTimeout(() => {
        Toast.show({
          type: toastType || 'success',
          text1: message || 'This is some something 👋',
          topOffset: topOffset,
          onShow: () => {
            isToastShowing.current = true
          },
          onHide: () => {
            isToastShowing.current = false
            if (toastTimeout.current) {
              clearTimeout(toastTimeout.current)
            }
          }
        })
      }, 200)
      return
    }

    Toast.show({
      type: toastType || 'success',
      text1: message || 'This is some something 👋',
      topOffset: topOffset,
      onShow: () => {
        isToastShowing.current = true
      },
      onHide: () => {
        isToastShowing.current = false
      }
    })
  }, [])

  const hideToast = useCallback(() => {
    Toast.hide()
  }, [])

  return { showToast, hideToast }
}

export const showToast = (toastType?: TMessageType, message?: string) => {
  Toast.show({
    type: toastType || 'success',
    text1: message || 'This is some something 👋',
    topOffset: topOffset
  })
}
