import {ImageStyle, ResizeMode} from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';

import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {SCREEN_WIDTH, sizeScale} from '@utils/dimensions';

import SvgIcon from '../SvgIcon/SvgIcon';
import ImageBase from './ImageBase';
import ImageZoom from './ImageZoom';

interface IZoomImageProps {
  uri: string | undefined;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle | ViewStyle>;
}

const ZoomImage = ({uri, resizeMode = 'cover', style}: IZoomImageProps) => {
  const [invisible, setIsVisible] = React.useState(false);
  const _handleToggleModal = React.useCallback(() => {
    setIsVisible(prevVisible => !prevVisible);
  }, []);
  return (
    <>
      <Modal visible={invisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={_handleToggleModal}>
            <SvgIcon name="xCircle" size={24} fill="ELEMENT_BASE" />
          </TouchableOpacity>

          <View style={styles.itemContainerModal}>
            <GestureHandlerRootView>
              <ImageZoom
                style={styles.imageModal}
                uri={uri}
                minScale={0.5}
                maxScale={5}
                doubleTapScale={3}
                minPanPointers={1}
                isSingleTapEnabled
                isDoubleTapEnabled
                resizeMode="contain"
              />
            </GestureHandlerRootView>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={_handleToggleModal}>
        <ImageBase
          pointerEvents="none"
          style={style as ImageStyle}
          source={{uri}}
          resizeMode={resizeMode}
        />
      </TouchableOpacity>
    </>
  );
};

export default ZoomImage;
const styles = StyleSheet.create({
  imageModal: {
    aspectRatio: 286 / 186,
    width: sizeScale(240),
    height: sizeScale(240),
    borderRadius: 12,
    // flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainerModal: {
    width: SCREEN_WIDTH,
    height: sizeScale(240),
  },
  closeButton: {
    position: 'absolute',
    top: 100,
    left: 10,
    zIndex: 1,
  },
});
