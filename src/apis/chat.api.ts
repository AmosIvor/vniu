import { ChatRoomResponseType, MessageRequestType, MessageResponseType } from '@appTypes/chat.type'
import { SuccessResponse } from '@appTypes/utils.type'
import { apis } from '@constants'

import { http } from '@utils'

const chatApi = {
  getChatRoomByUser(userId: string) {
    return http.get<SuccessResponse<ChatRoomResponseType>>(`api/Chat/chatrooms/${userId}`)
  },

  getMessagesByUser(userId: string) {
    return http.get<SuccessResponse<MessageResponseType[]>>(`api/Chat/chatrooms/${userId}/messages`)
  },

  sendMessageByUser({ userId, body }: { userId: string; body: MessageRequestType }) {
    return http.post<SuccessResponse<MessageResponseType>>(`api/Chat/chatrooms/${userId}/messages`, body)
  }
}

export default chatApi
