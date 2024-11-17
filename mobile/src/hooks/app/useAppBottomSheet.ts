import { useCallback, useRef } from 'react'
import { TBottomSheetRef } from 'src/components/base/BottomSheet/BottomSheet'

type TUseAppBottomSheetProps = {
  onOpen?: () => void
  onClose?: () => void
}
const useAppBottomSheet = ({ onOpen, onClose }: TUseAppBottomSheetProps = {}) => {
  const ref = useRef<TBottomSheetRef>(null)

  const open = useCallback(() => {
    onOpen?.()
    ref.current?.show()
  }, [onOpen])

  const close = useCallback(() => {
    onClose?.()
    ref.current?.hide()
  }, [onClose])

  return {
    ref,
    open,
    close
  }
}

export default useAppBottomSheet
