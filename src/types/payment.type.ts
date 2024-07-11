export interface PaymentRequest {
  orderTotal: number
  orderDescription: string
  userId: string
  isVnPay: boolean
}

export interface PaymentResponse {
  paymentMethodId: number
  paymentTransactionNo: string
  paymentProvider?: string
  paymentCartType?: string
  paymentDate?: string
  paymentStatus?: number
  isDefault?: boolean
  paymentDescription?: string
  paymentTypeId: number
}
