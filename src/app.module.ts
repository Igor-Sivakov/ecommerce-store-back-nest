import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaService } from 'src/prisma.service'

import { ProductModule } from './product/product.module'
import { PaymentModule } from './payment/payment.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'


@Module({
  imports: [ConfigModule.forRoot(), ProductModule, PaymentModule, AuthModule, UserModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule { }

