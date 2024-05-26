export interface ChatRoomResponseType {
  chatRoomId: number
  userId: string
}

export interface MessageResponseType {
  messageId: number
  messageContent: string
  imageUrl: string
  isFromUser: boolean
  messageCreateAt: string
  messageReadAt: string
  isRead: boolean
  chatRoomId: number
}

export interface MessageRequestType {
  messageContent: string
  imageUrl?: string
  isFromUser: boolean
  isRead: boolean
}
