import React, {useMemo} from 'react';

import {StyleSheet} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import {Image} from '../index';

interface IDefaultAvatarProps {
  uri?: string;
  size?: number;
  borderRadius?: number;
}
const DefaultAvatar = ({
  uri,
  size = 36,
  borderRadius = sizeScale(size) / 2,
}: IDefaultAvatarProps) => {
  const avatarStyle = useMemo(
    () =>
      StyleSheet.compose(styles.avatar, {
        width: sizeScale(size),
        height: sizeScale(size),
        borderRadius,
      }),
    [size, borderRadius],
  );
  if (uri) {
    return <Image.CDN uri={uri} style={avatarStyle} />;
  }
  return <Image.Local source={'emptyAvatar'} style={avatarStyle} />;
};
export default DefaultAvatar;
const styles = StyleSheet.create({
  avatar: {borderWidth: 1, borderColor: COLORS.BORDER_NEUTRAL},
});
