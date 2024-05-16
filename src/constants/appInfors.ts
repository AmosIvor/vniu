import { Dimensions } from 'react-native'
const designWidth = 414
const designHeight = 896
export const appInfors = {
  sizes: {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    reSizeWidth: function (number: any) {
      return (number * this.WIDTH) / designWidth
    },
    reSizeHeight: function (number: any) {
      return (number * this.HEIGHT) / designHeight
    }
  }
}
