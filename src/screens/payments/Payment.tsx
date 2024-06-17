import { chatApi } from '@apis'
import { appColors } from '@constants'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Text, View } from 'react-native'
const Payment = () => {
  const { data, error } = useQuery({
    queryKey: ['chatroom', 87],
    queryFn: () => chatApi.getChatRoomByUser('CS0003')
  })

  const product = useMemo(() => {
    if (data) {
      console.log(data.data.data)
      return data.data.data
    }
    return null
  }, [data])

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      {product && <Text style={{ fontSize: 20, color: appColors.black }}>{product.userId ?? 'Hello'}</Text>}
      {!product && <Text style={{ fontSize: 20, color: appColors.black }}>'None'</Text>}
      {error && <Text style={{ fontSize: 20, color: appColors.black }}>{error.message}</Text>}
    </View>
  )
}
export default Payment
