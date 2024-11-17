module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // [
    //   'module:react-native-dotenv',
    //   {
    //     moduleName: '@env',
    //   },
    // ],
    // [
    //   'module:react-native-dotenv',
    //   {
    //     moduleName: 'react-native-dotenv'
    //   }
    // ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false
      }
    ],
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@apis': './src/apis/index',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts/index',
          '@hooks': './src/hooks/index',
          '@modals': './src/modals/index',
          '@navigators': './src/navigators/index',
          '@screens': './src/screens/',
          '@styles': './src/styles/',
          '@theme': './src/theme',
          '@appTypes': './src/types/',
          '@configs': './src/configs',
          '@stores': './src/stores',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@configs': './src/configs',
          '@services': './src/services',
        }
      }
    ]
  ]
}
