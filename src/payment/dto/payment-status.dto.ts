
class AmountPayment {
  value: string
  currency: string
}

class ObjectPayment {
  id: string
  status: string
  amount: AmountPayment
  payment_method: {
    type: string
    id: number
    saved: boolean
    title: string
    card: object
  }
}

export class PaymentStatusDto {
  event: 'payment_succeeded' | 'payment_waiting_for_capture' | 'payment_canceled' | 'refound_succeeded'
  type: string
  object: ObjectPayment
}