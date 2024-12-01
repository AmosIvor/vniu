import { ServerAxios } from '@/helper/fetcher'

type UploadFileType = {
  file: File
}

export const uploadFile = ({ file }: UploadFileType) => {
  const formData = new FormData()
  formData.append('key', file)
  formData.append('value', file)
  formData.append('file', file)

  return ServerAxios.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    isDisableLoading: true,
    isDisableToast: true,
  })
}
