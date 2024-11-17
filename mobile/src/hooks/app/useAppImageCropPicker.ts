import ImageCropPicker from 'react-native-image-crop-picker'
import { RESULTS } from 'react-native-permissions'

import { useCallback } from 'react'
import { Permissions } from '@utils'

type ImageCropPickerOptions = Parameters<typeof ImageCropPicker.openPicker>['0']

export const useAppImageCropPicker = ({
  options,
  onPermissionDenied
}: {
  options: ImageCropPickerOptions
  onPermissionDenied?: () => void
}) => {
  const _handleCheckPermission = async () => {
    return await Permissions.library.check()
  }
  const pickImage = useCallback(async () => {
    const result = await _handleCheckPermission()

    if (result === RESULTS.BLOCKED) {
      onPermissionDenied?.()
      return
    }

    return ImageCropPicker.openPicker(options)
  }, [onPermissionDenied, options])

  return { pickImage }
}
