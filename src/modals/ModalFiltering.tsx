import {
  ButtonComponent,
  CategoriesComponent,
  RangeSliderComponent,
  RatingComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent
} from '@components'
import { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

interface Props {
  isVisible: boolean
  onClosed: () => void
  onSelected?: (vals: string[]) => void
  selected?: string[]
}

const ModalFiltering = (props: Props) => {
  const { isVisible, onClosed, onSelected, selected } = props

  const modalizeRef = useRef<Modalize>()

  useEffect(() => {
    if (isVisible) {
      modalizeRef.current?.open()
    } else {
      modalizeRef.current?.close()
    }
  }, [isVisible])

  return (
    <Portal>
      <Modalize handlePosition='inside' adjustToContentHeight ref={modalizeRef} onClose={onClosed}>
        <SectionComponent styles={{ padding: 30 }}>
          <TextComponent isTitle text='Property Type' size={20} />
          <SpaceComponent height={16} />
          <CategoriesComponent isFill />
        </SectionComponent>

        <SectionComponent>
          <TextComponent isTitle text='Price' size={20} />
          <SpaceComponent height={16} />
          <RangeSliderComponent
            from={100}
            to={2000}
            onChange={(from, to) => console.log(`from: ${from} - to: ${to}`)}
          />
        </SectionComponent>

        <SectionComponent>
          <TextComponent isTitle text='Rating' size={20} />
          <SpaceComponent height={16} />
          <RatingComponent value={0} onChange={(val: number) => console.log(val)} />
        </SectionComponent>

        <SectionComponent styles={{ padding: 30 }}>
          <ButtonComponent text='Apply' type='primary' />
        </SectionComponent>
      </Modalize>
    </Portal>
  )
}
export default ModalFiltering
