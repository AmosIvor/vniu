import type { ACCEPTED_FILE_TYPES, IMAGE_STATUS } from '@/constants/image'
import type { Key } from 'react-aria'

export type ImageProps = {
  id: Key
  url: string
  name: string
  type?: string
  status?: (typeof IMAGE_STATUS)[keyof typeof IMAGE_STATUS]
}

export type AcceptFileType = (typeof ACCEPTED_FILE_TYPES)[number]
