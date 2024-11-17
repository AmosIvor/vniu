import {ImageOrVideo} from 'react-native-image-crop-picker';

import DefaultAvatar from './DefaultAvatar';
import EditableAvatar from './EditableAvatar';

export const Avatar = {
  Default: DefaultAvatar,
  Editable: EditableAvatar,
};

export interface IEditableAvatarProps {
  uri?: string;
  size?: number;
  onPickImage?: (image: ImageOrVideo) => void;
}

export interface IPermissionModalContent {
  title: string;
  description: string;
  positiveLabel: string;
  neutralLabel: string;
  onPositivePress: () => void;
  onNeutralPress: () => void;
}
