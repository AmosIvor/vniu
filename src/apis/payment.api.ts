import { PaymentRequest, PaymentResponse } from '@appTypes/payment.type'
import { SuccessResponse } from '@appTypes/utils.type'
import { http } from '@utils'

const paymentApi = {
  createPaymentUrl(body: PaymentRequest) {
    return http.post<SuccessResponse<string>>(`api/User/online-payment/url`, body)
  },
  getPaymentResponse(url: string) {
    return http.get<SuccessResponse<PaymentResponse>>(`${url}`)
  }
}

export default paymentApi
