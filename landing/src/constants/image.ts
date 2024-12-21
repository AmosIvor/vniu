export const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/heic',
  'image/gif',
  'image/webp',
]

export const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm', 'video/ogg']

export const ACCEPTED_PDF_TYPES = [
  'application/pdf',
  'application/x-pdf',
  'application/vnd.pdf',
  'application/vnd.adobe.pdf',
]

export const ACCEPTED_FILE_TYPES = [
  ...ACCEPTED_IMAGE_TYPES,
  ...ACCEPTED_VIDEO_TYPES,
  ...ACCEPTED_PDF_TYPES,
]

export const IMAGE_STATUS = {
  SUCCESS: 'success',
  UPLOADING: 'uploading',
  ACCESS: 'access',
  ERROR: 'error',
  NO_ACCESS: 'no-access',
} as const
