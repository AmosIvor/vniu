module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@apis': './src/apis/index',
          '@assets': './src/assets/index',
          '@components': './src/components/index',
          '@constants': './src/constants/index',
          '@hooks': './src/hooks/index',
          '@modals': './src/modals/index',
          '@navigators': './src/navigators/index',
          '@screens': './src/screens/',
          '@styles': './src/styles/',
          '@theme': './src/theme',
          '@types': './src/types/',
          '@utils': './src/utils/'
        }
      }
    ]
  ]
}
