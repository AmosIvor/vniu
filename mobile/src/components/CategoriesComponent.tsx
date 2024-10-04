import React, { ReactNode } from 'react'
import { View, Text, FlatList } from 'react-native'
import { appColors } from 'src/constants/appColors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { TagComponent } from '@components'

interface Props {
  isFill?: boolean
}

interface ICategory {
  icon: ReactNode
  color: string
  label: string
  key: string
}

const CategoriesComponent = (props: Props) => {
  const { isFill } = props

  const categories: ICategory[] = [
    {
      key: 'Sports',
      label: 'Sports',
      icon: <FontAwesome5 name='basketball-ball' size={20} color={isFill ? appColors.bgPrimary : '#F0635A'} />,
      color: '#F0635A'
    },
    {
      key: 'Music',
      label: 'Music',
      icon: <FontAwesome5 name='music' size={20} color={isFill ? appColors.bgPrimary : '#F59762'} />,
      color: '#F59762'
    },
    {
      key: 'Food',
      label: 'Food',
      icon: (
        <MaterialCommunityIcons
          name='silverware-fork-knife'
          size={20}
          color={isFill ? appColors.bgPrimary : '#29D697'}
        />
      ),
      color: '#29D697'
    },
    {
      key: 'Art',
      label: 'Art',
      icon: <Ionicons name='color-palette' size={20} color={isFill ? appColors.bgPrimary : '#46CDFB'} />,
      color: '#46CDFB'
    }
  ]

  return (
    <FlatList
      contentContainerStyle={{ flexDirection: 'column' }}
      numColumns={3}
      horizontal={false}
      nestedScrollEnabled={true}
      scrollEnabled={false}
      data={categories}
      renderItem={({ item, index }) => (
        <TagComponent
          onPress={() => {}}
          styles={{ marginRight: index === categories.length - 1 ? 28 : 12, minWidth: 82, marginBottom: 10 }}
          icon={item.icon}
          label={item.label}
          bgColor={isFill ? item.color : appColors.bgPrimary}
        />
      )}
    />
  )
}
export default CategoriesComponent
