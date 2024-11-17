import ImageCropPicker from 'react-native-image-crop-picker';

type ImageCropPickerOptions = Parameters<
  typeof ImageCropPicker.openPicker
>['0'];

export const imageUpload: {[n: string]: ImageCropPickerOptions} = {
  profileImagePickOption: {
    mediaType: 'photo',
    width: 100,
    height: 100,
    maxFiles: 1,
    minFiles: 1,
    cropping: true,
  },
  kycImagePickOption: {
    mediaType: 'photo',
    width: 328,
    height: 219,
    maxFiles: 1,
    minFiles: 1,
    cropping: true,
  },
};
