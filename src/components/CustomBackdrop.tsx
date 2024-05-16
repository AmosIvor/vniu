// import React, { useMemo } from 'react'
// import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
// import Animated, { Extrapolate, interpolate, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'
// // import { BlurView } from '@react-native-community/blur'

// const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

// const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
//   const containerAnimatedStyle = useAnimatedStyle(() => ({
//     backgroundColor: `rgba(0,0,0,${interpolate(animatedIndex.value, [-1, 0], [0, 0.5], Extrapolate.CLAMP)})`
//   }))

//   // styles
//   const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style])

//   const blurViewProps = useAnimatedProps(() => {
//     return {
//       blurAmount: interpolate(animatedIndex.value, [-1, 0], [0, 20], Extrapolate.CLAMP)
//     }
//   })

//   return <AnimatedBlurView animatedProps={blurViewProps} style={containerStyle} />
// }

// export default CustomBackdrop
