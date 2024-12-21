import { PERMISSIONS, Permission, RESULTS, check, request } from 'react-native-permissions'

import { Platform } from 'react-native'

interface ICheckImageLibraryPermission {
  onGrantedCallback?: () => void
  onDeniedCallback: () => void
}

const libraryPermission = Platform.select({
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  default: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO
})

// From Android version 10, it's no longer require permission to access photos
export const isRequireLibraryPermission = Platform.OS === 'ios' || parseInt(`${Platform.Version}`, 10) < 29

const requestImageLibraryPermission = ({ onGrantedCallback, onDeniedCallback }: ICheckImageLibraryPermission) => {
  return _checkAndRequestPermission(libraryPermission, 'image library', onGrantedCallback, onDeniedCallback)
}

const checkImageLibraryPermission = async () => {
  const result = await check(libraryPermission)
  return result
}

const _checkAndRequestPermission = (
  permission: Permission,
  name: string,
  onGrantedCallback?: () => void,
  onDeniedCallback?: () => void
) => {
  check(permission)
    .then((result) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.error('This device not support')
          return false

        case RESULTS.DENIED:
          request(permission).then((requestResult) => {
            if (['granted', 'limited'].includes(requestResult)) {
              onGrantedCallback?.()
            } else {
              onDeniedCallback?.()
            }
          })
          break
        case RESULTS.BLOCKED:
          onDeniedCallback?.()
          return false
        case RESULTS.GRANTED:
          onGrantedCallback?.()
          return true

        case RESULTS.LIMITED:
          onGrantedCallback?.()
          return true
      }
    })
    .catch((error) => {
      console.log(`check ${name} permission error`, error)
    })
}

export const Permissions = {
  library: {
    request: requestImageLibraryPermission,
    check: checkImageLibraryPermission
  }
}
