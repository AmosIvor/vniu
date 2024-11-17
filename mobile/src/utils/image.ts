import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

type ImageCropPickerOptions = Parameters<
  typeof ImageCropPicker.openPicker
>['0'];

const profileImagePickOption: ImageCropPickerOptions = {
  mediaType: 'photo',
  width: 100,
  height: 100,
  maxFiles: 1,
  minFiles: 1,
  cropping: true,
};

export const presetPickOptions = {
  profileImg: profileImagePickOption,
};

const _pickMedia = ({
  options,
  onPicked,
  onFailed,
  onFinally,
}: {
  options: ImageCropPickerOptions;
  onPicked: (image: ImageOrVideo) => void;
  onFailed: (e: any) => void;
  onFinally: () => void;
}) => {
  ImageCropPicker.openPicker(options)
    .then(onPicked)
    .catch(onFailed)
    .finally(onFinally);
};

export const image = {
  pick: _pickMedia,
};
