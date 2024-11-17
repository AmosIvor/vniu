import React, {useMemo} from 'react';

import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import {Divider, SvgIcon, TIconName} from '../../base';
import Text from '../Text/Text';
import {TTextSize, TTextWeight} from '../Text/type';

interface IDialogContentProps {
  children: React.ReactNode;
}
export const DialogContent = ({children}: IDialogContentProps) => {
  return <View style={styles.contentContainer}>{children}</View>;
};

export const DialogActionLine = () => {
  return <Divider.Line color="BORDER_NEUTRAL" />;
};

interface IDialogActionLineProps {
  children: React.ReactNode;
}
export const DialogAction = ({children}: IDialogActionLineProps) => {
  return <View style={styles.buttonsWrapper}>{children}</View>;
};

interface IDialogTextTitleProps {
  children: string;
}
export const DialogTextTitle = ({children}: IDialogTextTitleProps) => {
  return (
    <Text size="18" weight="medium" color="ELEMENT_BASE">
      {children}
    </Text>
  );
};

interface IDialogTextDescriptionProps {
  children: React.ReactNode;
  textSize?: TTextSize;
  color?: keyof typeof COLORS;
  weight?: TTextWeight;
}
export const DialogTextDescription = ({
  children,
  textSize = '14',
  color = 'ELEMENT_BASE_2',
  weight = 'light',
}: IDialogTextDescriptionProps) => {
  return (
    <Text size={textSize} weight={weight} color={color}>
      {children}
    </Text>
  );
};

interface IDialogButtonProps {
  onPress: () => void;
  label: string;
  labelColor?: keyof typeof COLORS;
  backgroundColor?: keyof typeof COLORS;
}
export const DialogButton = ({
  label = 'label',
  onPress,
  backgroundColor,
  labelColor = 'ELEMENT_BASE',
}: IDialogButtonProps) => {
  const buttonContainerStyle: ViewStyle = useMemo(() => {
    return {
      ...styles.buttonContainer,
      backgroundColor: backgroundColor ? COLORS[backgroundColor] : undefined,
    };
  }, [backgroundColor]);

  return (
    <TouchableOpacity style={buttonContainerStyle} onPress={onPress}>
      <Text size="16" weight="medium" color={labelColor}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

type TTextIconHeaderProps = {
  backgroundColor?: keyof typeof COLORS;
  children?: React.ReactNode;
};

export const TextIconHeader = ({
  backgroundColor = 'SURFACE_ACCENT_4',
  children,
}: TTextIconHeaderProps) => {
  const textIconHeaderWrapperStyle: ViewStyle = useMemo(() => {
    return {
      ...styles.textIconHeaderWrapper,
      backgroundColor: backgroundColor ? COLORS[backgroundColor] : undefined,
    };
  }, [backgroundColor]);

  return (
    <View style={styles.TextIconHeaderContainer}>
      <View style={textIconHeaderWrapperStyle}>
        <Text size="30" weight="medium">
          {children}
        </Text>
      </View>
    </View>
  );
};

type TIconHeaderProps = {
  backgroundColor?: keyof typeof COLORS;
  iconName: TIconName;
};

export const IconHeader = ({
  backgroundColor = 'SURFACE_ACCENT_4',
  iconName,
}: TIconHeaderProps) => {
  const textIconHeaderWrapperStyle: ViewStyle = useMemo(() => {
    return {
      ...styles.textIconHeaderWrapper,
      backgroundColor: backgroundColor ? COLORS[backgroundColor] : undefined,
    };
  }, [backgroundColor]);

  return (
    <View style={styles.TextIconHeaderContainer}>
      <View style={textIconHeaderWrapperStyle}>
        <SvgIcon name={iconName} size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextIconHeaderContainer: {
    height: sizeScale(28),
    marginHorizontal: sizeScale(16),
  },
  buttonsWrapper: {
    borderTopWidth: 1,
    flexDirection: 'row',
    borderTopColor: COLORS.BORDER_NEUTRAL,
    overflow: 'hidden',
    borderBottomLeftRadius: sizeScale(8),
    borderBottomRightRadius: sizeScale(8),
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizeScale(60),
  },
  contentContainer: {
    gap: sizeScale(16),
    paddingVertical: sizeScale(16),
    paddingHorizontal: sizeScale(22),
  },
  textIconHeaderWrapper: {
    width: sizeScale(56),
    height: sizeScale(56),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeScale(28),
    position: 'absolute',
    top: sizeScale(-28),
  },
});
