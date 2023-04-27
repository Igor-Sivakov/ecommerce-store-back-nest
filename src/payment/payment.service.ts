import { BadRequestException, Injectable } from '@nestjs/common'

import { faker } from '@faker-js/faker'
import * as YooKassa from 'yookassa'

import { PaymentStatusDto } from './dto/payment-status.dto'
import { PaymentDto } from './dto/payment.dto'

const yooKassa = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey: process.env['PAYMENT_TOKEN']
})

@Injectable()
export class PaymentService {
  async payment(dto: PaymentDto) {
    const payment = await yooKassa.createPayment({
      amount: {
        value: dto.amount.toFixed(2),
        currency: 'RUB'
      },
      payment_method_data: {
        type: 'bank_card'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://localhost:3000/thanks'
      },
      description: faker.name.jobTitle
    })

    return payment
  }

  async paymentStatus(dto: PaymentStatusDto) {
    /* Confirm Payment */
    if (dto.event !== 'payment_waiting_for_capture') return

    try {
      const payment = await yooKassa.capturePayment(dto.object.id, dto.object.amount)

      return payment
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error)
    }
  }
}