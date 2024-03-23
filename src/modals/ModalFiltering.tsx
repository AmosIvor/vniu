import { RowComponent, SectionComponent, TextComponent } from '@components'
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
        <SectionComponent>
          <RowComponent>
            <TextComponent text='Hello' />
          </RowComponent>
        </SectionComponent>
      </Modalize>
    </Portal>
  )
}
export default ModalFiltering
