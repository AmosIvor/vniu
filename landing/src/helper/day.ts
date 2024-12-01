import { DATE_FORMAT } from '@/enums'
import { DateTime } from 'luxon'

export const formatDate = (date: Date, format: keyof typeof DATE_FORMAT = 'DD_MM_YYYY'): string => {
  return DateTime.fromJSDate(date).toFormat(DATE_FORMAT[format])
}
