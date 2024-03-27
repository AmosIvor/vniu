import { ReactNode } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { appColors } from 'src/constants/appColors'
import { globalStyles } from 'src/styles/globalStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Props {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  affix?: ReactNode
  suffix?: ReactNode
  isAllowClear?: boolean
}

const InputComponent = (props: Props) => {
  const { value, onChange, placeholder, affix, suffix, isAllowClear } = props

  return (
    <View style={[styles.inputContainer]}>
      {affix ?? affix}

      <TextInput
        value={value}
        style={[styles.input, globalStyles.text]}
        placeholder={placeholder ?? ''}
        onChangeText={(val) => onChange(val)}
      />

      {suffix ?? suffix}

      <TouchableOpacity onPress={() => onChange('')}>
        {isAllowClear && value && <AntDesign name='close' size={22} color={appColors.black} />}
      </TouchableOpacity>
    </View>
  )
}
export default InputComponent

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.black,
    width: '100%',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.bgPrimary,
    marginBottom: 19
  },

  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: appColors.text
  }
})
