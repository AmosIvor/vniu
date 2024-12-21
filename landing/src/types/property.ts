type MediaType = {
  url: string
  type: FileType
}

export type PropertyType = 'resident-home' | 'apartment' | 'land'
export type PropertyTypes = {
  id: string
  name: string
  address: string
  provinceId: string
  description?: string
  noBedrooms?: number
  direction?: string
  noBathrooms?: number
  noFloors?: number
  pricePerSquareMeter?: number
  area?: number
  pricePerSqm?: number
  districtId: string
  wardId: string
  largeThumbnailUrl: string
  smallThumbnailUrl: string
  propertyType?: PropertyType
  apartmentType?: string
  landType?: string
  annualRentIncome?: number
  managementFee?: number
  annualCashFlow?: number
  annualAppreciation?: number
  pricePerShare?: number
  minimumInvestment?: number
  closingCosts?: number
  holdingCosts?: number
  propertyImprovement?: number
  originalPrice?: number
  sourcingFee?: number
  leverage: number
  mortgageLength?: number
  interestType?: string
  paidType?: string
  loans: number
  fundNeeded?: number
  totalShares?: number
  investors?: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  status: string
  medias: MediaType[]
  documents: MediaType[]
}

export type PropertyInformationType = {
  propertyType: string
  propertyName: string
  provinceId: string
  districtId: string
  wardId: string
  address?: string
  description?: string
  direction?: string
  largeThumbnailUrl?: string
  smallThumbnailUrl?: string
  medias?: {
    url: string
  }[]
  loans?: number
  leverage?: number
  noBedrooms?: number
  noBathrooms?: number
  noFloors?: number
  area?: number
  pricePerSqm?: number
  apartmentType?: string
  landType?: string
  originalPrice?: number
  interestType?: string
  mortgageLength?: number
  paidType?: string
}

export type PropertyReturnsType = {
  annualRentIncome?: number
  managementFee?: number
  annualAppreciation?: number
  annualCashFlow: number
}

export type PropertyFinancialBreakdownType = {
  minimumInvestment?: number
  closingCosts?: number
  holdingCosts?: number
  propertyImprovement?: number
  leverage?: number
  originalPrice: number
  sourcingFee: number
  fundNeeded: number
  totalShares: number
  pricePerShare?: number
}

export type FileType = 'image' | 'video' | 'legal_document_pdf' | 'legal_document_image'
export type PropertyDocumentsType = {
  documents: MediaType[]
}
export type PublishedPropertyType = {
  publishedDate: Date
}
