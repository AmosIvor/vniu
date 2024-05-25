import { ChatRoomResponseType } from '@appTypes/chat.type'
import { SuccessResponse } from '@appTypes/utils.type'
import { apis } from '@constants'

import { http } from '@utils'

const chatApi = {
  getChatRoomByUser(userId: string) {
    return http.get<SuccessResponse<ChatRoomResponseType>>(`api/Chat/chatrooms/${userId}`)
  }
}

export default chatApi
