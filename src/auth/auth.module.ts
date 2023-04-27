import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from './../config/jwt.config'
import { JwtStrategy } from './jwt.strategy'

import { PrismaService } from 'src/prisma.service'
import { AuthService } from './auth.service'
import { UserService } from 'src/user/user.service'

import { AuthController } from './auth.controller'




@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ]
})
export class AuthModule { }
