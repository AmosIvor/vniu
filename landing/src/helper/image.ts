import type { AcceptFileType } from '@/types/image'
import type { ImageProps } from '@/components/ui/browse-files'

import { ACCEPTED_FILE_TYPES, IMAGE_STATUS } from '@/constants/image'
import { FileTypeReq } from '@/enums/image'

const typeMapping: { [key: string]: FileTypeReq } = {
  image: FileTypeReq.IMAGE,
  video: FileTypeReq.VIDEO,
  pdf: FileTypeReq.LEGAL_DOCUMENT_PDF,
}
export const createImageObject = (
  file: File,
  acceptImageType: AcceptFileType[] = ACCEPTED_FILE_TYPES,
): ImageProps => {
  const isValidFileType = acceptImageType.includes(file.type)
  // const url = URL.createObjectURL(file)
  const matchedType = Object.keys(typeMapping).find((key) => file.type.includes(key))
  const baseImage = {
    url: '',
    alt: file.name,
    type: matchedType ? typeMapping[matchedType] : FileTypeReq.IMAGE,
    name: file.name,
    id: crypto.randomUUID(),
  }

  if (isValidFileType) {
    return {
      ...baseImage,
      status: IMAGE_STATUS.UPLOADING,
    }
  }

  return {
    ...baseImage,
    status: IMAGE_STATUS.NO_ACCESS,
  }
}
